package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
