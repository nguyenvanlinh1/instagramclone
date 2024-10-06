package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Comment;
import com.nvl.ins_be.model.Post;
import com.nvl.ins_be.model.Story;
import com.nvl.ins_be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPost(Post post);
    List<Comment> findByStory(Story story);
    List<Comment> findByParentComment(Comment parentComment);

//    @Query("SELECT c FROM Comment c WHERE c.parentComment.commentId = :commentId")
//    List<Comment> findByParentComment(@Param("commentId") Long commentId);
}
