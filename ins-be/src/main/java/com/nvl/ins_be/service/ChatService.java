package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.GroupChatRequest;
import com.nvl.ins_be.model.Chat;
import com.nvl.ins_be.model.User;

import java.util.List;

public interface ChatService {

    Chat createChat(User userReq, Long user);
    Chat findChatById(Long chatId);
    List<Chat> findAllChatByUserId(Long userId);
    Chat createGroup(GroupChatRequest request, Long userReq);
    Chat addUserToGroup(Long userId, Long chatId, User userReq);
    void renameGroup(Long chatId, String groupName, User userReq);
    Chat removeFromGroup(Long chatId, Long userId, User userReq);
    void deleteChat(Long chatId, Long userId);

}
