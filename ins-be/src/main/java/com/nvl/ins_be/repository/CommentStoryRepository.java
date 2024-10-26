package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.CommentStory;
import com.nvl.ins_be.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentStoryRepository extends JpaRepository<CommentStory, Long> {

    List<CommentStory> findByStory(Story story);
    List<CommentStory> findByParentComment(CommentStory parentComment);
}
