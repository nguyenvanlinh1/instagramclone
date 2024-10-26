package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("Select p from Post p where p.user.userId = :userId")
    List<Post> findPostByUserId(@Param("userId") Long userId);
}
