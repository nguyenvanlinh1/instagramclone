package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.GroupChatRequest;
import com.nvl.ins_be.dto.request.SingleChatRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.model.Chat;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.service.ChatService;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatController {
    ChatService chatService;
    UserService userService;

    @PostMapping("/create/single")
    ApiResponse<Chat> createChat(@RequestBody SingleChatRequest request){
        User user = userService.getUser();
        return ApiResponse.<Chat>builder()
                .result(chatService.createChat(user, request.getUserId()))
                .build();
    }

    @PostMapping("/create/group")
    ApiResponse<Chat> createGroupChat(@RequestBody GroupChatRequest request){
        User user = userService.getUser();
        return ApiResponse.<Chat>builder()
                .result(chatService.createGroup(request, user.getUserId()))
                .build();
    }

    @GetMapping("/{chatId}")
    ApiResponse<Chat> findChatById(@PathVariable Long chatId){
        User user = userService.getUser();
        return ApiResponse.<Chat>builder()
                .result(chatService.findChatById(chatId))
                .build();
    }

    @GetMapping("/")
    ApiResponse<List<Chat>> findAllChatByUserId(){
        User user = userService.getUser();
        return ApiResponse.<List<Chat>>builder()
                .result(chatService.findAllChatByUserId(user.getUserId()))
                .build();
    }

    @PutMapping("/{chatId}/create/{userId}")
    ApiResponse<Chat> addUserToGroup(@PathVariable Long chatId, @PathVariable Long userId){
        User user = userService.getUser();
        return ApiResponse.<Chat>builder()
                .result(chatService.addUserToGroup(userId, chatId, user))
                .build();
    }

    @PutMapping("/{chatId}/delete/{userId}")
    ApiResponse<Void> removeUserFromGroup(@PathVariable Long chatId, @PathVariable Long userId){
        User user = userService.getUser();
        chatService.removeFromGroup(chatId, userId, user);
        return ApiResponse.<Void>builder()
                .message("Delete User From Group Successfully")
                .build();
    }

    @DeleteMapping("/delete/{chatId}")
    ApiResponse<Void> deleteChat(@PathVariable Long chatId){
        User user = userService.getUser();
        chatService.deleteChat(chatId, user.getUserId());
        return ApiResponse.<Void>builder()
                .message("Delete Chat Successfully")
                .build();
    }












}
