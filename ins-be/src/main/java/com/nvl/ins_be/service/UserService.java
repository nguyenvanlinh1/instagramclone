package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.UserRequest;
import com.nvl.ins_be.dto.response.AuthenticationResponse;
import com.nvl.ins_be.model.User;

import java.util.List;

public interface UserService {
    AuthenticationResponse createUser(UserRequest userRequest);

    User updateUser(Long userId, UserRequest userRequest);
    void deleteUser(Long userId);

    User getUser();

    List<User> findAllUserByUsername(String username);
}
