package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.UserRequest;
import com.nvl.ins_be.dto.response.AuthenticationResponse;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.UserRepository;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @Override
    public AuthenticationResponse createUser(UserRequest request) {

        boolean isUser = userRepository.existsByEmail(request.getEmail());
        if(isUser) throw new AppException(ErrorCode.USER_EXISTED);

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());

        userRepository.save(user);
        return AuthenticationResponse.builder()
                .build();
    }

    @Override
    public User updateUser(Long userId, UserRequest userRequest) {
        User updateUser = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        updateUser.setUserImage(updateUser.getUserImage());
        updateUser.setBio(updateUser.getBio());
        updateUser.setGender(updateUser.getGender());
        return userRepository.save(updateUser);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User getUser() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        return userRepository.findByEmail(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    @Override
    public List<User> findAllUserByUsername(String username) {
        return userRepository.findUserByName(username);
    }
}
