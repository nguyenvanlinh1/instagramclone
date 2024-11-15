package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.ImageRequest;
import com.nvl.ins_be.dto.request.PostRequest;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.ImagePost;
import com.nvl.ins_be.model.Post;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.PostRepository;
import com.nvl.ins_be.repository.UserRepository;
import com.nvl.ins_be.service.FollowService;
import com.nvl.ins_be.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImpl implements PostService {

    PostRepository postRepository;
    UserRepository userRepository;
    FollowService followService;

    @Override
    public Post createPost(User user, PostRequest request) {
        Post post = new Post();
        post.setCaption(request.getCaption());
        post.setLocation(request.getLocation());
        post.setStatus(request.getStatus());
        post.setUser(user);

        List<ImagePost> images = new ArrayList<>();
        for (ImageRequest imageRequest : request.getImages()){
            ImagePost newImage = new ImagePost();
            newImage.setImageUrl(imageRequest.getImageUrl());
            newImage.setPost(post);
            images.add(newImage);
        }

        post.setImageList(images);

        return postRepository.save(post);
    }

    @Override
    public boolean isSavedPost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        for(User user : post.getSavedByUsers()){
            if(user.getUserId().equals(userId)) return true;
        }
        return false;
    }

    @Override
    public boolean isLikedPost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        for(User user : post.getLikedByUsers()){
            if(user.getUserId().equals(userId)) return true;
        }
        return false;
    }

    @Override
    public Post updatePost(PostRequest request, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        post.setCaption(request.getCaption());
        post.setLocation(request.getLocation());
        post.setStatus(request.getStatus());
        post.getImageList().clear();
        Set<ImagePost> images = new LinkedHashSet<>();
        for(ImageRequest imageRequest : request.getImages()){
            ImagePost updateImage = ImagePost.builder()
                    .imageUrl(imageRequest.getImageUrl())
                    .post(post)
                    .build();
            post.getImageList().add(updateImage);
        }
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
    public List<Post> getAllPostFromUserFollow(Long userId) {
        List<User> users = followService.getFollowedUsers(userId);
        List<Post> myPost = postRepository.findPostByUserId(userId);
        List<Post> allPosts = new ArrayList<>(myPost);
        for(User user : users){
            List<Post> posts = postRepository.findPostByUserId(user.getUserId());
            allPosts.addAll(posts);
        }
        return allPosts;
    }

    @Override
    public List<Post> getAllPostByUserSaved(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return postRepository.findAllByUserSaved(user.getUserId());
    }

    @Override
    public List<Post> getAllPostByUserLiked(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return postRepository.findAllByUserLiked(user.getUserId());
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
    public Post likePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        Set<User> userLiked = post.getLikedByUsers();
        User userLikePost = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userLiked.add(userLikePost);
        post.setLikedByUsers(userLiked);
        return postRepository.save(post);
    }

    @Override
    public Post unLikedPost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        Set<User> userLiked = post.getLikedByUsers();
        User userUnLiked = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userLiked.remove(userUnLiked);
        post.setLikedByUsers(userLiked);
        return postRepository.save(post);
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
