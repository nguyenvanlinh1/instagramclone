package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.PostRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.model.Post;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.service.PostService;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostController {

    PostService postService;
    UserService userService;

    @PostMapping("/create")
    ApiResponse<Post> createPost(@RequestBody PostRequest request){
        User user = userService.getUser();
        return ApiResponse.<Post>builder()
                .result(postService.createPost(user, request))
                .message("Create Post Successfully")
                .build();
    }

    @PutMapping("/update/{postId}")
    ApiResponse<Post> updatePost(@RequestBody PostRequest request, @PathVariable Long postId){
        User user = userService.getUser();
        return ApiResponse.<Post>builder()
                .result(postService.updatePost(request, postId))
                .message("Update Post Successfully")
                .build();
    }

    @DeleteMapping("/delete/{postId}")
    ApiResponse<Void> deletePost(@PathVariable Long postId){
        User user = userService.getUser();
        postService.deletePost(postId);
        return ApiResponse.<Void>builder()
                .message("Delete Post Successfully")
                .build();
    }

    @GetMapping("/")
    ApiResponse<List<Post>> getAllPostByUser(){
        User user = userService.getUser();
        return ApiResponse.<List<Post>>builder()
                .result(postService.getAllPostByUserId(user.getUserId()))
                .build();
    }

    @GetMapping("/all")
    ApiResponse<List<Post>> getAllPost(){
        User user = userService.getUser();
        return ApiResponse.<List<Post>>builder()
                .result(postService.getAllPost())
                .build();
    }

    @PutMapping("/like/{postId}")
    ApiResponse<Void> likedPost(@PathVariable Long postId){
        User user = userService.getUser();
        postService.likePost(user.getUserId(), postId);
        return ApiResponse.<Void>builder()
                .message("Like Post Successfully")
                .build();
    }

    @PutMapping("/unlike/{postId}")
    ApiResponse<Void> unLikedPost(@PathVariable Long postId){
        User user = userService.getUser();
        postService.unLikedPost(user.getUserId(), postId);
        return ApiResponse.<Void>builder()
                .message("Unlike Post Successfully")
                .build();
    }

    @PutMapping("/save/{postId}")
    ApiResponse<Void> savedPost(@PathVariable Long postId){
        User user = userService.getUser();
        postService.savePost(user.getUserId(), postId);
        return ApiResponse.<Void>builder()
                .message("Saved Post Successfully")
                .build();
    }

    @PutMapping("/unsaved/{postId}")
    ApiResponse<Void> unSavedPost(@PathVariable Long postId){
        User user = userService.getUser();
        postService.unSavedPost(user.getUserId(), postId);
        return ApiResponse.<Void>builder()
                .message("Unsaved Post Successfully")
                .build();
    }
}
