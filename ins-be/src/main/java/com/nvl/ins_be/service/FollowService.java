package com.nvl.ins_be.service;

import com.nvl.ins_be.model.User;

import java.util.List;

public interface FollowService {

    void follow(Long follower, Long followed);
    void unfollow(Long userId, Long followed);

    //danh sach user theo doi
    List<User> getFollowedUsers(Long userId);

    //danh sach theo doi user
    List<User> getFollowerUsers(Long userId);
}
