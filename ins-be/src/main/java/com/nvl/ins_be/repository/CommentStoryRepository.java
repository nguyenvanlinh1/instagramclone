package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.CommentStory;
import com.nvl.ins_be.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentStoryRepository extends JpaRepository<CommentStory, Long> {

    @Query("Select ct from CommentStory ct where ct.story.storyId = :storyId")
    List<CommentStory> findByStoryId(Long storyId);

    List<CommentStory> findByParentComment(CommentStory parentComment);
}
