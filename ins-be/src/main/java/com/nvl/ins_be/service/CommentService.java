package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.CommentRequest;
import com.nvl.ins_be.model.Comment;

import java.util.List;

public interface CommentService {
    Comment createCommentPost(Long userId, Long postId, CommentRequest request);
    Comment createCommentStory(Long userId, Long storyId, CommentRequest request);
    Comment createCommentReplay(Long userId, Long commentId, CommentRequest request);

    void deleteComment(Long commentId, Long userId);

    List<Comment> getCommentByPost(Long postId);
    List<Comment> getCommentByStory(Long storyId);
    List<Comment> getCommentByCommentReplay(Long commentId);

    void likeComment(Long userId, Long commentId);
    void unLikeComment(Long userId, Long commentId);
}
