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

    @GetMapping("/{userId}")
    ApiResponse<List<Post>> getAllPostByUserId(@PathVariable Long userId){
        return ApiResponse.<List<Post>>builder()
                .result(postService.getAllPostByUserId(userId))
                .build();
    }

    @GetMapping("/saved/{userId}")
    ApiResponse<List<Post>> getPostByUserSaved(@PathVariable Long userId){
        return ApiResponse.<List<Post>>builder()
                .result(postService.getAllPostByUserSaved(userId))
                .build();
    }

    @GetMapping("/liked/{userId}")
    ApiResponse<List<Post>> getPostByUserLiked(@PathVariable Long userId){
        return ApiResponse.<List<Post>>builder()
                .result(postService.getAllPostByUserLiked(userId))
                .build();
    }

    @GetMapping("/all/{userId}")
    ApiResponse<List<Post>> getAllPostFromUserFollow(@PathVariable Long userId){
        return ApiResponse.<List<Post>>builder()
                .result(postService.getAllPostFromUserFollow(userId))
                .build();
    }

    @GetMapping("/like/{postId}/check")
    ApiResponse<Boolean> isLikedPost(@PathVariable Long postId){
        User user = userService.getUser();
        return ApiResponse.<Boolean>builder()
                .result(postService.isLikedPost(user.getUserId(), postId))
                .build();
    }

    @GetMapping("/save/{postId}/check")
    ApiResponse<Boolean> isSavedPost(@PathVariable Long postId){
        User user = userService.getUser();
        return ApiResponse.<Boolean>builder()
                .result(postService.isSavedPost(user.getUserId(), postId))
                .build();
    }


    @PutMapping("/like/{postId}")
    ApiResponse<Post> likedPost(@PathVariable Long postId){
        User user = userService.getUser();
        return ApiResponse.<Post>builder()
                .result(postService.likePost(user.getUserId(), postId))
                .message("Like Post Successfully")
                .build();
    }

    @PutMapping("/unlike/{postId}")
    ApiResponse<Post> unLikedPost(@PathVariable Long postId){
        User user = userService.getUser();
        return ApiResponse.<Post>builder()
                .result(postService.unLikedPost(user.getUserId(), postId))
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
