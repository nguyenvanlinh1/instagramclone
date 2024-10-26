package com.nvl.ins_be.service.Impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.nvl.ins_be.dto.request.AuthenticationRequest;
import com.nvl.ins_be.dto.request.ExchangeTokenRequest;
import com.nvl.ins_be.dto.request.LogoutRequest;
import com.nvl.ins_be.dto.request.SendEmail.EmailRequest;
import com.nvl.ins_be.dto.request.SendEmail.Receive;
import com.nvl.ins_be.dto.request.SendEmail.Sender;
import com.nvl.ins_be.dto.request.UserRequest;
import com.nvl.ins_be.dto.response.AuthenticationResponse;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.HttpClient.EmailClient;
import com.nvl.ins_be.repository.HttpClient.OutboundClient;
import com.nvl.ins_be.repository.HttpClient.OutboundUserClient;
import com.nvl.ins_be.repository.UserRepository;
import feign.FeignException;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    OutboundClient outboundClient;
    OutboundUserClient outboundUserClient;
    EmailClient emailClient;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SECRET_KEY;

    @NonFinal
    @Value("${outbound.client-id}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${outbound.client-secret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${outbound.redirect-uri}")
    protected String REDIRECT_URI;

    @NonFinal
    protected String GRANT_TYPE = "authorization_code";

    @NonFinal
    @Value("${email.apiKey}")
    protected String API_KEY;

    public AuthenticationResponse authenticate(AuthenticationRequest request){

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if(!authenticated) throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);


        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("NguyenVanLinh")
                        .email("nvanlinh1406@gmail.com")
                        .build())
                .to(List.of(Receive.builder()
                        .email(request.getEmail())
                        .name(request.getEmail())
                        .build()))
                .subject("Welcome to Instagram")
                .htmlContent("You just logged into Instagram.")
                .build();

        try {
            emailClient.sendEmail(API_KEY, emailRequest);
        }
        catch (FeignException e) {
            throw  new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }

        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public AuthenticationResponse authenticate(UserRequest request){

        boolean isUser = userRepository.existsByEmail(request.getEmail());
        if(isUser) throw new AppException(ErrorCode.USER_EXISTED);
        User user = User.builder()
                .email(request.getEmail())
                .fullName(request.getFullName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("NguyenVanLinh")
                        .email("nvanlinh1406@gmail.com")
                        .build())
                .to(List.of(Receive.builder()
                        .email(request.getEmail())
                        .name(request.getUsername())
                        .build()))
                .subject("Welcome to Instagram")
                .htmlContent("Hello " + request.getFullName())
                .build();

        try {
            emailClient.sendEmail(API_KEY, emailRequest);
        }
        catch (FeignException e) {
            throw  new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }

        userRepository.save(user);

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public AuthenticationResponse outboundAuthenticate(String code){
        var response = outboundClient.exchangeToken(ExchangeTokenRequest.builder()
                        .code(code)
                        .clientId(CLIENT_ID)
                        .clientSecret(CLIENT_SECRET)
                        .redirectUri(REDIRECT_URI)
                        .grantType(GRANT_TYPE)
                .build());

        log.info("TOKEN RESPONSE {}", response);
        var userInfo = outboundUserClient.getUserInfo("json", response.getAccessToken());

        var user = userRepository.findByEmail(userInfo.getEmail()).orElseGet(() -> userRepository.save(User.builder()
                        .email(userInfo.getEmail())
                        .username(userInfo.getGivenName())
                        .fullName(userInfo.getName())
                        .userImage(userInfo.getPicture())
                .build()));
        log.info("User Info {}", userInfo);

        var token = generateToken(user);

        return AuthenticationResponse.builder().token(token).build();
    }

    public String generateToken(User user){

        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("nvanlinh.com")
                .expirationTime(new Date(Instant.now().plus(6, ChronoUnit.HOURS).toEpochMilli()))
                .issueTime(new Date())
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", "USER")
                .build();

        Payload payload = jwtClaimsSet.toPayload();

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(SECRET_KEY.getBytes()));
            return jwsObject.serialize();
        }
        catch (Exception e){
            throw new RuntimeException();
        }
    }

    public SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier jwsVerifier = new MACVerifier(SECRET_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(jwsVerifier);

        if(!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);

        return signedJWT;
    }
}
