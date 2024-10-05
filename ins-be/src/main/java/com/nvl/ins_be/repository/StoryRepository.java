package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
