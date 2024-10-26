package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.StoryRequest;
import com.nvl.ins_be.model.Story;
import com.nvl.ins_be.model.User;

import java.util.List;

public interface StoryService {
    Story createStory(User user, StoryRequest request);
    void deleteStory(Long storyId);
    List<Story> getAllStoryByUserId(Long userId);
    List<Story> getAllStoryFromUserFollowed(Long userId);
    List<Story> getAllStoryByUsername(String username);

    void likeStory(Long userId, Long storyId);
    void unLikedStory(Long userId, Long storyId);
}
