package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.CommentRequest;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.Comment;
import com.nvl.ins_be.model.Post;
import com.nvl.ins_be.model.Story;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.CommentRepository;
import com.nvl.ins_be.repository.PostRepository;
import com.nvl.ins_be.repository.StoryRepository;
import com.nvl.ins_be.repository.UserRepository;
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
    CommentRepository commentRepository;

    @Override
    public Comment createCommentPost(Long userId, Long postId, CommentRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setUser(user);

        post.getComments().add(comment);
        postRepository.save(post);
        return commentRepository.save(comment);
    }

    @Override
    public Comment createCommentStory(Long userId, Long storyId, CommentRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Story story = storyRepository.findById(storyId).orElseThrow(() -> new AppException(ErrorCode.STORY_NOT_EXISTED));

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setStory(story);
        comment.setUser(user);

        story.getComments().add(comment);
        storyRepository.save(story);
        return commentRepository.save(comment);
    }

    @Override
    public Comment createCommentReplay(Long userId, Long parentId, CommentRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Comment parentComment  = commentRepository.findById(parentId).orElseThrow(() -> new AppException(ErrorCode.STORY_NOT_EXISTED));

        Comment commentReplay = Comment.builder()
                .parentComment(parentComment)
                .user(user)
                .content(request.getContent())
                .post(parentComment.getPost())
                .story(parentComment.getStory())
                .build();

        return commentRepository.save(commentReplay);
    }

    @Override
    public void deleteComment(Long commentId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        if(!comment.getUser().getUserId().equals(userId)) throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);

        commentRepository.delete(comment);
    }

    @Override
    public List<Comment> getCommentByPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        return commentRepository.findByPost(post);
    }

    @Override
    public List<Comment> getCommentByStory(Long storyId) {
        Story story = storyRepository.findById(storyId).orElseThrow(() -> new AppException(ErrorCode.STORY_NOT_EXISTED));
        return commentRepository.findByStory(story);
    }

    @Override
    public List<Comment> getCommentByCommentReplay(Long commentId) {
        Comment commentParent = commentRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));
        return commentRepository.findByParentComment(commentParent);
    }

    @Override
    public void likeComment(Long userId, Long commentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        Set<User> likedCommentByUser = comment.getLikedCommentByUser();
        if(likedCommentByUser.contains(user)){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        else{
            likedCommentByUser.add(user);
        }
        comment.setLikedCommentByUser(likedCommentByUser);
        commentRepository.save(comment);
    }

    @Override
    public void unLikeComment(Long userId, Long commentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));
        Set<User> likedCommentByUser = comment.getLikedCommentByUser();

        if (likedCommentByUser.contains(user)) {
            likedCommentByUser.remove(user);
        } else {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        comment.setLikedCommentByUser(likedCommentByUser);
        commentRepository.save(comment);
    }
}
