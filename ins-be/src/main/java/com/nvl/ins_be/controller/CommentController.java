package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.CommentRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.model.Comment;
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

    @PostMapping("/create/post")
    ApiResponse<Comment> createCommentPost(@PathVariable Long postId, CommentRequest request){
        User user = userService.getUser();
        return ApiResponse.<Comment>builder()
                .result(commentService.createCommentPost(user.getUserId(), postId, request))
                .build();
    }

    @PostMapping("/create/story")
    ApiResponse<Comment> createCommentStory(@PathVariable Long postId, CommentRequest request){
        User user = userService.getUser();
        return ApiResponse.<Comment>builder()
                .result(commentService.createCommentStory(user.getUserId(), postId, request))
                .build();
    }

    @PostMapping("/create/{commentId}")
    ApiResponse<Comment> createCommentReplay(@PathVariable Long commentId, CommentRequest request){
        User user = userService.getUser();
        return ApiResponse.<Comment>builder()
                .result(commentService.createCommentReplay(user.getUserId(), commentId, request))
                .build();
    }

    @DeleteMapping("/delete/{commentId}")
    ApiResponse<Void> createCommentReplay(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.deleteComment(commentId, user.getUserId());
        return ApiResponse.<Void>builder()
                .message("Delete Comment Successfully")
                .build();
    }

    @GetMapping("/post/{postId}")
    ApiResponse<List<Comment>> getCommentByPost(@PathVariable Long postId){
        return ApiResponse.<List<Comment>>builder()
                .result(commentService.getCommentByPost(postId))
                .build();
    }

    @GetMapping("/story/{storyId}")
    ApiResponse<List<Comment>> getCommentByStory(@PathVariable Long storyId){
        return ApiResponse.<List<Comment>>builder()
                .result(commentService.getCommentByStory(storyId))
                .build();
    }

    @GetMapping("/{commentId}")
    ApiResponse<List<Comment>> getCommentByCommentReplay(@PathVariable Long commentId){
        return ApiResponse.<List<Comment>>builder()
                .result(commentService.getCommentByCommentReplay(commentId))
                .build();
    }

    @PutMapping("/like/{commentId}")
    ApiResponse<Void> likeComment(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.likeComment(user.getUserId(), commentId);
        return ApiResponse.<Void>builder()
                .message("Like Comment Successfully")
                .build();
    }

    @PutMapping("/unlike/{commentId}")
    ApiResponse<Void> unLikeComment(@PathVariable Long commentId){
        User user = userService.getUser();
        commentService.unLikeComment(user.getUserId(), commentId);
        return ApiResponse.<Void>builder()
                .message("Unlike Comment Successfully")
                .build();
    }
}
