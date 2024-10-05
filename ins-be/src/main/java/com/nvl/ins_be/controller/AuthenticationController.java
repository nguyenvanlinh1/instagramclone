package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.AuthenticationRequest;
import com.nvl.ins_be.dto.request.UserRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.dto.response.AuthenticationResponse;
import com.nvl.ins_be.service.Impl.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService authenticationService;

    @PostMapping("/sign_in")
    ApiResponse<AuthenticationResponse> authenticate(AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/sign_up")
    ApiResponse<AuthenticationResponse> createUser(@Valid UserRequest userRequest){
        var result = authenticationService.authenticate(userRequest);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }
}
