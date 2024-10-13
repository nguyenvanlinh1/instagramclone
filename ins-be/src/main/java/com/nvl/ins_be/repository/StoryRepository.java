package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {

    @Query("Select s from Story s where s.user.userId = :userId")
    List<Story> findStoryByUserId(@Param("userId") Long userId);

    @Query("SELECT s FROM Story s JOIN s.user u WHERE u.username = :username")
    List<Story> findStoryByUsername(@Param("username") String username);
}
