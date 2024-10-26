package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.SendMessageRequest;
import com.nvl.ins_be.model.Message;
import com.nvl.ins_be.model.User;

import java.util.List;

public interface MessageService {

    Message sendMessage(SendMessageRequest request);
    List<Message> getChatMessage(Long chatId, User userReq);
    Message findMessageById(Long messageId);
    void deleteMessage(Long messageId, User userReq);
}
