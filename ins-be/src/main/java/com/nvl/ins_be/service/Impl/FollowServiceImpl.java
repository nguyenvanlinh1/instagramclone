package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.Follow;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.FollowRepository;
import com.nvl.ins_be.repository.UserRepository;
import com.nvl.ins_be.service.FollowService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FollowServiceImpl implements FollowService {

    UserRepository userRepository;
    FollowRepository followRepository;

    @Override
    public void follow(Long userId, Long followed) {
        User myUser = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        User yourUser = userRepository.findById(followed).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(followRepository.existsByFollowerAndFollowed(myUser, yourUser)) throw new AppException(ErrorCode.USER_ALREADY_FOLLOWED);
        Follow follow = Follow.builder()
                .follower(myUser)
                .followed(yourUser)
                .build();
        followRepository.save(follow);
    }

    @Override
    public void unfollow(Long userId, Long followed) {
        User myUser = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        User yourUser = userRepository.findById(followed).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Follow follow = followRepository.findByFollowerAndFollowed(myUser, yourUser).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_ALREADY_FOLLOWED));
        followRepository.delete(follow);
    }

    @Override
    public List<User> getFollowedUsers(Long followId) {
        User user = userRepository.findById(followId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<Follow> follows = followRepository.findByFollower(user);
        return follows.stream().map(Follow::getFollowed).collect(Collectors.toList());
    }

    @Override
    public List<User> getFollowerUsers(Long followId) {
        User user = userRepository.findById(followId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<Follow> follows = followRepository.findByFollowed(user);
        return follows.stream().map(Follow::getFollower).collect(Collectors.toList());
    }
}
