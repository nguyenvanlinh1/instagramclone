package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.AuthenticationRequest;
import com.nvl.ins_be.dto.request.UserRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.dto.response.AuthenticationResponse;
import com.nvl.ins_be.service.Impl.AuthenticationService;
import com.nvl.ins_be.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationController {

    AuthenticationService authenticationService;
    UserService userService;

    @PostMapping("/outbound/authentication")
    ApiResponse<AuthenticationResponse> outboundAuthenticate(@RequestParam("code") String code){
        var result = authenticationService.outboundAuthenticate(code);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/sign_in")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/sign_up")
    ApiResponse<AuthenticationResponse> createUser(@RequestBody @Valid UserRequest userRequest){
        var result = authenticationService.authenticate(userRequest);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }
}
