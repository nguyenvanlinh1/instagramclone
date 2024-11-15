package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.CommentRequest;
import com.nvl.ins_be.model.CommentPost;
import com.nvl.ins_be.model.CommentStory;

import javax.xml.stream.events.Comment;
import java.util.List;

public interface CommentService {
    CommentPost createCommentPost(Long userId, Long postId, CommentRequest request);
    CommentStory createCommentStory(Long userId, Long storyId, CommentRequest request);

    CommentPost createCommentPostReplay(Long userId, Long commentId, CommentRequest request);
    CommentStory createCommentStoryReplay(Long userId, Long commentId, CommentRequest request);

    void deleteCommentPost(Long commentId, Long userId);
    void deleteCommentStory(Long commentId, Long userId);

    void deleteCommentPostReplay(Long commentId, Long userId);
    void deleteCommentStoryReplay(Long commentId, Long userId);

    List<CommentPost> getCommentByPost(Long postId);
    List<CommentStory> getCommentByStory(Long storyId);

    List<CommentPost> getCommentPostByCommentReplay(Long commentId);
    List<CommentStory> getCommentStoryByCommentReplay(Long commentId);

    CommentPost likeCommentPost(Long userId, Long commentId);
    CommentPost unLikeCommentPost(Long userId, Long commentId);

    CommentStory likeCommentStory(Long userId, Long commentId);
    CommentStory unLikeCommentStory(Long userId, Long commentId);
}
