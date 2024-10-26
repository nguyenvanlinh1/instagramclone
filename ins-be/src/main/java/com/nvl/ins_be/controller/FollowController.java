package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.model.Follow;
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

    @GetMapping("/follower/{followId}")
    ApiResponse<List<User>> getFollower(@PathVariable Long followId){
        User user = userService.getUser();
        return ApiResponse.<List<User>>builder()
                .result(followService.getFollowerUsers(followId))
                .build();
    }

    @GetMapping("/followed/{followId}")
    ApiResponse<List<User>> getFollowed(@PathVariable Long followId){
        User user = userService.getUser();
        return ApiResponse.<List<User>>builder()
                .result(followService.getFollowedUsers(followId))
                .build();
    }

    @PutMapping("/follow/{followId}")
    ApiResponse<Void> follow(@PathVariable Long followId){
        User user = userService.getUser();
        followService.follow(user.getUserId(), followId);
        return ApiResponse.<Void>builder()
                .message("Follow User Successfully")
                .build();
    }

    @PutMapping("/unfollow/{followId}")
    ApiResponse<Void> unFollow(@PathVariable Long followId){
        User user = userService.getUser();
        followService.unfollow(user.getUserId(), followId);
        return ApiResponse.<Void>builder()
                .message("Unfollow User Successfully")
                .build();
    }
}
