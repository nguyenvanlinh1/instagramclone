package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.ImageRequest;
import com.nvl.ins_be.dto.request.StoryRequest;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.ImageStory;
import com.nvl.ins_be.model.Story;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.StoryRepository;
import com.nvl.ins_be.repository.UserRepository;
import com.nvl.ins_be.service.StoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StoryServiceImpl implements StoryService {

    StoryRepository storyRepository;
    UserRepository userRepository;

    @Override
    public Story createStory(User user, StoryRequest request) {
        Story story = new Story();
        story.setCaption(request.getCaption());
        story.setUser(user);
        Set<ImageStory> imageStories = new LinkedHashSet<>();
        for(ImageRequest imageRequest : request.getImages()){
            ImageStory imageStory = new ImageStory();
            imageStory.setImageUrl(imageRequest.getImageUrl());
            imageStory.setStory(story);
            imageStories.add(imageStory);
        }
        story.setImageList(imageStories);
        return storyRepository.save(story);
    }

    @Override
    public void deleteStory(Long storyId) {
        storyRepository.deleteById(storyId);
    }

    @Override
    public List<Story> getAllStoryByUserId(Long userId) {
        boolean isUser = userRepository.existsById(userId);
        if(!isUser) throw new AppException(ErrorCode.USER_NOT_EXISTED);
        return storyRepository.findStoryByUserId(userId);
    }

    @Override
    public List<Story> getAllStory() {
        return storyRepository.findAll();
    }

    @Override
    public void likeStory(Long userId, Long storyId) {
        Story story = storyRepository.findById(storyId).orElseThrow(() -> new AppException(ErrorCode.STORY_NOT_EXISTED));
        Set<User> userLikeStory = story.getLikedStoryByUser();
        User userLike = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(userLikeStory.contains(userLike)) throw new AppException(ErrorCode.USER_EXISTED);
        userLikeStory.add(userLike);
        story.setLikedStoryByUser(userLikeStory);
        storyRepository.save(story);
    }

    @Override
    public void unLikedStory(Long userId, Long storyId) {
        Story story = storyRepository.findById(storyId).orElseThrow(() -> new AppException(ErrorCode.STORY_NOT_EXISTED));
        Set<User> userUnLikeStory = story.getLikedStoryByUser();
        User userUnLike = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(!userUnLikeStory.contains(userUnLike)) throw new AppException(ErrorCode.USER_NOT_EXISTED);
        userUnLikeStory.remove(userUnLike);
        story.setLikedStoryByUser(userUnLikeStory);
        storyRepository.save(story);
    }
}
