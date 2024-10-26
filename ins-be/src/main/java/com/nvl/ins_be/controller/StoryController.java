package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.StoryRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.model.Story;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.service.StoryService;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/story")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StoryController {

    StoryService storyService;
    UserService userService;

    @PostMapping("/create")
    ApiResponse<Story> createStory(@RequestBody StoryRequest request){
        User user = userService.getUser();
        return ApiResponse.<Story>builder()
                .result(storyService.createStory(user, request))
                .message("Create Story Successfully")
                .build();
    }

    @DeleteMapping("/delete/{storyId}")
    ApiResponse<Void> updateStory(@PathVariable Long storyId){
        storyService.deleteStory(storyId);
        return ApiResponse.<Void>builder()
                .message("Delete Story Successfully")
                .build();
    }

    @GetMapping("/")
    ApiResponse<List<Story>> getAllStoryByUser(){
        User user = userService.getUser();
        return ApiResponse.<List<Story>>builder()
                .result(storyService.getAllStoryByUserId(user.getUserId()))
                .build();
    }

    @GetMapping("/{userId}")
    ApiResponse<List<Story>> getAllStoryFromUserFollowed(@PathVariable Long userId){
        return ApiResponse.<List<Story>>builder()
                .result(storyService.getAllStoryFromUserFollowed(userId))
                .build();
    }

    @GetMapping("/username")
    ApiResponse<List<Story>> getAllStoryFromUserFollowed(@RequestParam("username") String username){
        return ApiResponse.<List<Story>>builder()
                .result(storyService.getAllStoryByUsername(username))
                .build();
    }

    @PutMapping("/like/{storyId}")
    ApiResponse<Void> likedStory(@PathVariable Long storyId){
        User user = userService.getUser();
        storyService.likeStory(user.getUserId(), storyId);
        return ApiResponse.<Void>builder()
                .message("Like Story Successfully")
                .build();
    }

    @PutMapping("/unlike/{storyId}")
    ApiResponse<Void> unLikedStory(@PathVariable Long storyId){
        User user = userService.getUser();
        storyService.unLikedStory(user.getUserId(), storyId);
        return ApiResponse.<Void>builder()
                .message("Unlike Story Successfully")
                .build();
    }

}
