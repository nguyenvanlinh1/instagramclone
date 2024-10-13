package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.service.FollowService;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FollowController {

    FollowService followService;
    UserService userService;

    @GetMapping("/follower/{userId}")
    ApiResponse<List<User>> getFollower(@PathVariable Long userId){
        User user = userService.getUser();
        return ApiResponse.<List<User>>builder()
                .result(followService.getFollowerUsers(userId))
                .build();
    }

    @GetMapping("/follower")
    ApiResponse<List<User>> getMyFollower(){
        User user = userService.getUser();
        return ApiResponse.<List<User>>builder()
                .result(followService.getFollowerUsers(user.getUserId()))
                .build();
    }

    @GetMapping("/followed/{userId}")
    ApiResponse<List<User>> getFollowed(@PathVariable Long userId){
        User user = userService.getUser();
        return ApiResponse.<List<User>>builder()
                .result(followService.getFollowedUsers(userId))
                .build();
    }

    @GetMapping("/followed")
    ApiResponse<List<User>> getMyFollowed(){
        User user = userService.getUser();
        return ApiResponse.<List<User>>builder()
                .result(followService.getFollowedUsers(user.getUserId()))
                .build();
    }

    @PutMapping("/follow/{userId}")
    ApiResponse<Void> follow(@PathVariable Long userId){
        User user = userService.getUser();
        followService.follow(user.getUserId(), userId);
        return ApiResponse.<Void>builder()
                .message("Follow User Successfully")
                .build();
    }

    @PutMapping("/unfollow/{userId}")
    ApiResponse<Void> unFollow(@PathVariable Long userId){
        User user = userService.getUser();
        followService.unfollow(user.getUserId(), userId);
        return ApiResponse.<Void>builder()
                .message("Unfollow User Successfully")
                .build();
    }
}
