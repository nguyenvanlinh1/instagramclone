package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.CommentRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.model.CommentPost;
import com.nvl.ins_be.model.CommentStory;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.service.CommentService;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentController {

    CommentService commentService;
    UserService userService;

    @PostMapping("/create/post/{postId}")
    ApiResponse<CommentPost> createCommentPost(@PathVariable Long postId, @RequestBody CommentRequest request){
        User user = userService.getUser();
        return ApiResponse.<CommentPost>builder()
                .result(commentService.createCommentPost(user.getUserId(), postId, request))
                .build();
    }

    @PostMapping("/create/story/{storyId}")
    ApiResponse<CommentStory> createCommentStory(@PathVariable Long storyId, @RequestBody CommentRequest request){
        User user = userService.getUser();
        return ApiResponse.<CommentStory>builder()
                .result(commentService.createCommentStory(user.getUserId(), storyId, request))
                .build();
    }

    @PostMapping("/create/post/{commentId}/replay")
    ApiResponse<CommentPost> createCommentPostReplay(@PathVariable Long commentId, @RequestBody CommentRequest request){
        User user = userService.getUser();
        return ApiResponse.<CommentPost>builder()
                .result(commentService.createCommentPostReplay(user.getUserId(), commentId, request))
                .build();
    }

    @PostMapping("/create/story/{commentId}/replay")
    ApiResponse<CommentStory> createCommentStoryReplay(@PathVariable Long commentId, @RequestBody CommentRequest request){
        User user = userService.getUser();
        return ApiResponse.<CommentStory>builder()
                .result(commentService.createCommentStoryReplay(user.getUserId(), commentId, request))
                .build();
    }

    @DeleteMapping("/delete/post/{commentId}")
    ApiResponse<Void> deleteCommentPost(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.deleteCommentPost(commentId, user.getUserId());
        return ApiResponse.<Void>builder()
                .message("Delete Comment Post Successfully")
                .build();
    }

    @DeleteMapping("/delete/story/{commentId}")
    ApiResponse<Void> deleteCommentStory(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.deleteCommentStory(commentId, user.getUserId());
        return ApiResponse.<Void>builder()
                .message("Delete Comment Story Successfully")
                .build();
    }

    @GetMapping("/post/{postId}")
    ApiResponse<List<CommentPost>> getCommentByPost(@PathVariable Long postId){
        return ApiResponse.<List<CommentPost>>builder()
                .result(commentService.getCommentByPost(postId))
                .build();
    }

    @GetMapping("/story/{storyId}")
    ApiResponse<List<CommentStory>> getCommentByStory(@PathVariable Long storyId){
        return ApiResponse.<List<CommentStory>>builder()
                .result(commentService.getCommentByStory(storyId))
                .build();
    }

    @GetMapping("/post/{commentId}/replay")
    ApiResponse<List<CommentPost>> getCommentPostByCommentReplay(@PathVariable Long commentId){
        return ApiResponse.<List<CommentPost>>builder()
                .result(commentService.getCommentPostByCommentReplay(commentId))
                .build();
    }

    @GetMapping("/story/{commentId}/replay")
    ApiResponse<List<CommentStory>> getCommentStoryByCommentReplay(@PathVariable Long commentId){
        return ApiResponse.<List<CommentStory>>builder()
                .result(commentService.getCommentStoryByCommentReplay(commentId))
                .build();
    }

    @PutMapping("/like/post/{commentId}")
    ApiResponse<Void> likeCommentPost(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.likeCommentPost(user.getUserId(), commentId);
        return ApiResponse.<Void>builder()
                .message("Like Comment Post Successfully")
                .build();
    }

    @PutMapping("/unlike/post/{commentId}")
    ApiResponse<Void> unLikeCommentPost(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.unLikeCommentPost(user.getUserId(), commentId);
        return ApiResponse.<Void>builder()
                .message("Unlike Comment Post Successfully")
                .build();
    }

    @PutMapping("/like/story/{commentId}")
    ApiResponse<Void> likeCommentStory(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.unLikeCommentStory(user.getUserId(), commentId);
        return ApiResponse.<Void>builder()
                .message("Like Comment Story Successfully")
                .build();
    }

    @PutMapping("/unlike/story/{commentId}")
    ApiResponse<Void> unLikeCommentStory(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.unLikeCommentStory(user.getUserId(), commentId);
        return ApiResponse.<Void>builder()
                .message("Unlike Comment Story Successfully")
                .build();
    }
}
