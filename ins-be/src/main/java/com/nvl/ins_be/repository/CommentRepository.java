package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
