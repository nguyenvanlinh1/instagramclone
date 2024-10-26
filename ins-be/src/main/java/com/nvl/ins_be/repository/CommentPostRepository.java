package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.CommentPost;
import com.nvl.ins_be.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentPostRepository extends JpaRepository<CommentPost, Long> {

    @Query("Select cp from CommentPost cp where cp.post.postId = :postId")
    List<CommentPost> findByPostId(@Param("postId") Long postId);

    List<CommentPost> findByParentComment(CommentPost parentComment);

//    @Query("SELECT c FROM Comment c WHERE c.parentComment.commentId = :commentId")
//    List<Comment> findByParentComment(@Param("commentId") Long commentId);
}
