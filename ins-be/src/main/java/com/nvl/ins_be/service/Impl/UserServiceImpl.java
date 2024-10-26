package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.SendEmail.EmailRequest;
import com.nvl.ins_be.dto.request.SendEmail.Receive;
import com.nvl.ins_be.dto.request.SendEmail.Sender;
import com.nvl.ins_be.dto.request.UserRequest;
import com.nvl.ins_be.dto.response.AuthenticationResponse;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.HttpClient.EmailClient;
import com.nvl.ins_be.repository.UserRepository;
import com.nvl.ins_be.service.EmailService;
import com.nvl.ins_be.service.UserService;
import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    EmailClient emailClient;

    @NonFinal
    @Value("${email.apiKey}")
    protected String API_KEY;

    @Override
    public AuthenticationResponse createUser(UserRequest request) {

        boolean isUser = userRepository.existsByEmail(request.getEmail());
        if(isUser) throw new AppException(ErrorCode.USER_EXISTED);

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());

        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("NguyenVanLinh")
                        .email("nvanlinh1406@gmail.com")
                        .build())
                .to(List.of(Receive.builder()
                                .email("nvanlinh@yopmail.com")
                                .name(request.getUsername())
                        .build()))
                .subject("Welcome to Instagram")
                .htmlContent("Hello " + request.getFullName())
                .build();

        try {
            emailClient.sendEmail(API_KEY, emailRequest);
            log.info("Email");
        }
        catch (FeignException e) {
            throw  new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }

        userRepository.save(user);
        return AuthenticationResponse.builder()
                .build();
    }

    @Override
    public User updateUser(Long userId, UserRequest userRequest) {
        User updateUser = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        updateUser.setUserImage(userRequest.getUserImage());
        updateUser.setBio(userRequest.getBio());
        updateUser.setGender(userRequest.getGender());
        return userRepository.save(updateUser);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User getUser() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        return userRepository.findByEmail(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    @Override
    public List<User> findAllUserByUsername(String username) {
        return userRepository.findUserByName(username);
    }

    @Override
    public List<User> findUserNotFollow(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userRepository.findUserByNotFollow(userId);
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}
