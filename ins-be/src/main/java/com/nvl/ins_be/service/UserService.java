package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.UserRequest;
import com.nvl.ins_be.dto.response.AuthenticationResponse;

public interface UserService {
    AuthenticationResponse createUser(UserRequest userRequest);
}
