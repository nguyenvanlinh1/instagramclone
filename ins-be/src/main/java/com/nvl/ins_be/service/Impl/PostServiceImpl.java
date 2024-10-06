package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.PostRequest;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.Post;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.PostRepository;
import com.nvl.ins_be.repository.UserRepository;
import com.nvl.ins_be.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImpl implements PostService {

    PostRepository postRepository;
    UserRepository userRepository;

    @Override
    public Post createPost(User user, PostRequest request) {
        Post post = new Post();
        post.setCaption(request.getCaption());
        post.setLocation(request.getLocation());
        post.setImageList(request.getImages().stream().toList());
        post.setStatus(request.getStatus());
        post.setUser(user);
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(PostRequest request, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_EXISTED));
        post.setCaption(request.getCaption());
        post.setLocation(request.getLocation());
        post.setImageList(request.getImages().stream().toList());
        post.setStatus(request.getStatus());
        return postRepository.save(post);
    }

    @Override
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public List<Post> getAllPostByUserId(Long userId) {
        boolean isUser = userRepository.existsById(userId);
        if(!isUser) throw new AppException(ErrorCode.USER_NOT_EXISTED);
        return postRepository.findPostByUserId(userId);
    }

    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Integer countLiked(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        return post.getLikedByUsers().size();
    }

    @Override
    public Integer countSaved(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        return post.getSavedByUsers().size();
    }

//    @Override
//    public Integer countShared(Long postId) {
//        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
//        return post.getSharedByUsers().size();
//    }

    @Override
    public Integer countComment(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        return post.getComments().size();
    }

    @Override
    public void likePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        Set<User> userLiked = post.getLikedByUsers();
        User userLikePost = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userLiked.add(userLikePost);
        post.setLikedByUsers(userLiked);
        postRepository.save(post);
    }

    @Override
    public void unLikedPost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        Set<User> userLiked = post.getLikedByUsers();
        User userUnLiked = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userLiked.remove(userUnLiked);
        post.setLikedByUsers(userLiked);
        postRepository.save(post);
    }

    @Override
    public void savePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        Set<User> userSaved = post.getSavedByUsers();
        User userSavedPost = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userSaved.add(userSavedPost);
        post.setSavedByUsers(userSaved);
        postRepository.save(post);
    }

    @Override
    public void unSavedPost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        Set<User> userSaved = post.getSavedByUsers();
        User userUnSaved = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userSaved.remove(userUnSaved);
        post.setSavedByUsers(userSaved);
        postRepository.save(post);
    }
}
