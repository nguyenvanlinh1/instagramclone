package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.SendMessageRequest;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.Chat;
import com.nvl.ins_be.model.Message;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.ChatRepository;
import com.nvl.ins_be.repository.MessageRepository;
import com.nvl.ins_be.repository.UserRepository;
import com.nvl.ins_be.service.MessageService;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageServiceImpl implements MessageService {

    MessageRepository messageRepository;
    UserRepository userRepository;
    ChatRepository chatRepository;

    @Override
    public Message sendMessage(SendMessageRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Chat chat = chatRepository.findById(request.getChatId()).orElseThrow(() -> new AppException(ErrorCode.CHAT_NOT_EXISTED));
        Message message = new Message();
        message.setChat(chat);
        message.setSender(user);
        message.setContent(request.getContent());
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getChatMessage(Long chatId, User userReq) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new AppException(ErrorCode.CHAT_NOT_EXISTED));
        if (!chat.getUsers().contains(userReq)){
            throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);
        }
        return messageRepository.findByChatId(chat.getChatId());
    }

    @Override
    public Message findMessageById(Long messageId) {
        return messageRepository.findById(messageId).orElseThrow(() -> new AppException(ErrorCode.MESSAGE_NOT_EXISTED));
    }

    @Override
    public void deleteMessage(Long messageId, User userReq) {
        Message message = messageRepository.findById(messageId).orElseThrow(() -> new AppException(ErrorCode.MESSAGE_NOT_EXISTED));
        if(message.getSender().getUserId().equals(userReq.getUserId())){
            messageRepository.delete(message);
        }
        else throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);
    }
}
