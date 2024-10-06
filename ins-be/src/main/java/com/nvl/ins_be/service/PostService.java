package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.PostRequest;
import com.nvl.ins_be.model.Post;
import com.nvl.ins_be.model.User;

import java.util.List;

public interface PostService {

    Post createPost(User user, PostRequest request);
    Post updatePost(PostRequest request, Long postId);
    void deletePost(Long postId);
    List<Post> getAllPostByUserId(Long userId);
    List<Post> getAllPost();
    Integer countLiked(Long postId);
    Integer countSaved(Long postId);
//    Integer countShared(Long postId);
    Integer countComment(Long postId);
    void likePost(Long userId, Long postId);
    void unLikedPost(Long userId, Long postId);
    void savePost(Long userId, Long postId);
    void unSavedPost(Long userId, Long postId);
}
