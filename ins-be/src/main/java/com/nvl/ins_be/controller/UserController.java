package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.UserRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.dto.response.UserResponse;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @GetMapping("/")
    ApiResponse<User> getUser(){
        User user = userService.getUser();
        return ApiResponse.<User>builder()
                .result(user)
                .build();
    }

    @PutMapping("/update")
    ApiResponse<User> updateUser(@RequestBody UserRequest userRequest){
        User user = userService.getUser();
        return ApiResponse.<User>builder()
                .result(userService.updateUser(user.getUserId(), userRequest))
                .build();
    }

    @GetMapping("/search")
    ApiResponse<List<User>> findUserByName(@RequestParam String name){
        return ApiResponse.<List<User>>builder()
                .result(userService.findAllUserByUsername(name))
                .build();
    }
}
