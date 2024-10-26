package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.CommentPost;
import com.nvl.ins_be.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentPostRepository extends JpaRepository<CommentPost, Long> {

    List<CommentPost> findByPost(Post post);
    List<CommentPost> findByParentComment(CommentPost parentComment);

//    @Query("SELECT c FROM Comment c WHERE c.parentComment.commentId = :commentId")
//    List<Comment> findByParentComment(@Param("commentId") Long commentId);
}
