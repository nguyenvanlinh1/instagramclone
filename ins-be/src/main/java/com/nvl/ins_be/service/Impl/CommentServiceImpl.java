package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.CommentRequest;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.*;
import com.nvl.ins_be.repository.*;
import com.nvl.ins_be.service.CommentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentServiceImpl implements CommentService {

    PostRepository postRepository;
    StoryRepository storyRepository;
    UserRepository userRepository;
    CommentPostRepository commentPostRepository;
    CommentStoryRepository commentStoryRepository;

    @Override
    public CommentPost createCommentPost(Long userId, Long postId, CommentRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        CommentPost comment = new CommentPost();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setUser(user);

        post.getComments().add(comment);
        postRepository.save(post);
        return comment;
    }

    @Override
    public CommentStory createCommentStory(Long userId, Long storyId, CommentRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Story story = storyRepository.findById(storyId).orElseThrow(() -> new AppException(ErrorCode.STORY_NOT_EXISTED));

        CommentStory comment = new CommentStory();
        comment.setContent(request.getContent());
        comment.setStory(story);
        comment.setUser(user);

        story.getComments().add(comment);
        storyRepository.save(story);
        return comment;
    }

    @Override
    public CommentPost createCommentPostReplay(Long userId, Long parentId, CommentRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CommentPost parentComment  = commentPostRepository.findById(parentId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        CommentPost commentReplay = CommentPost.builder()
                .parentComment(parentComment)
                .user(user)
                .content(request.getContent())
                .post(parentComment.getPost())
                .build();

        return commentPostRepository.save(commentReplay);
    }

    @Override
    public CommentStory createCommentStoryReplay(Long userId, Long parentId, CommentRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CommentStory parentComment  = commentStoryRepository.findById(parentId).orElseThrow(() -> new AppException(ErrorCode.STORY_NOT_EXISTED));

        CommentStory commentReplay = CommentStory.builder()
                .parentComment(parentComment)
                .user(user)
                .content(request.getContent())
                .story(parentComment.getStory())
                .build();

        return commentStoryRepository.save(commentReplay);
    }


    @Override
    public void deleteCommentStory(Long commentId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CommentStory comment = commentStoryRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        if(!comment.getUser().getUserId().equals(userId)) throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);

        commentStoryRepository.delete(comment);
    }

    @Override
    public void deleteCommentPostReplay(Long commentId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    }

    @Override
    public void deleteCommentStoryReplay(Long commentId, Long userId) {

    }

    @Override
    public void deleteCommentPost(Long commentId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CommentPost comment = commentPostRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        if(!comment.getUser().getUserId().equals(userId)) throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);

        commentPostRepository.delete(comment);
    }

    @Override
    public List<CommentPost> getCommentByPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        return commentPostRepository.findByPost(post);
    }

    @Override
    public List<CommentStory> getCommentByStory(Long storyId) {
        Story story = storyRepository.findById(storyId).orElseThrow(() -> new AppException(ErrorCode.STORY_NOT_EXISTED));
        return commentStoryRepository.findByStory(story);
    }

    @Override
    public List<CommentPost> getCommentPostByCommentReplay(Long commentId) {
        CommentPost commentParent = commentPostRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));
        return commentPostRepository.findByParentComment(commentParent);
    }

    @Override
    public List<CommentStory> getCommentStoryByCommentReplay(Long commentId) {
        CommentStory commentParent = commentStoryRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));
        return commentStoryRepository.findByParentComment(commentParent);
    }

    @Override
    public void likeCommentPost(Long userId, Long commentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CommentPost comment = commentPostRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        Set<User> likedCommentByUser = comment.getLikedCommentByUser();
        if(likedCommentByUser.contains(user)){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        else{
            likedCommentByUser.add(user);
        }
        comment.setLikedCommentByUser(likedCommentByUser);
        commentPostRepository.save(comment);
    }

    @Override
    public void unLikeCommentPost(Long userId, Long commentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CommentPost comment = commentPostRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));
        Set<User> likedCommentByUser = comment.getLikedCommentByUser();

        if (likedCommentByUser.contains(user)) {
            likedCommentByUser.remove(user);
        } else {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        comment.setLikedCommentByUser(likedCommentByUser);
        commentPostRepository.save(comment);
    }

    @Override
    public void likeCommentStory(Long userId, Long commentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CommentStory comment = commentStoryRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        Set<User> likedCommentByUser = comment.getLikedCommentByUser();
        if(likedCommentByUser.contains(user)){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        else{
            likedCommentByUser.add(user);
        }
        comment.setLikedCommentByUser(likedCommentByUser);
        commentStoryRepository.save(comment);
    }

    @Override
    public void unLikeCommentStory(Long userId, Long commentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CommentStory comment = commentStoryRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));
        Set<User> likedCommentByUser = comment.getLikedCommentByUser();

        if (likedCommentByUser.contains(user)) {
            likedCommentByUser.remove(user);
        } else {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        comment.setLikedCommentByUser(likedCommentByUser);
        commentStoryRepository.save(comment);
    }
}
