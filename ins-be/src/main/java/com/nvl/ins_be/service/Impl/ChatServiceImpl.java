package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.GroupChatRequest;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.model.Chat;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.repository.ChatRepository;
import com.nvl.ins_be.repository.UserRepository;
import com.nvl.ins_be.service.ChatService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatServiceImpl implements ChatService {

    ChatRepository chatRepository;
    UserRepository userRepository;

    @Override
    public Chat createChat(User userReq, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Chat isChatExist = chatRepository.findSingleChatByUserId(user, userReq);
        Chat chat = new Chat();
        chat.setCreatedBy(userReq);
        chat.getUsers().add(user);
        chat.getUsers().add(userReq);
        chat.setGroup(false);
        return chatRepository.save(chat);
    }

    @Override
    public Chat findChatById(Long chatId) {
        return chatRepository.findById(chatId).orElseThrow(() -> new AppException(ErrorCode.CHAT_NOT_EXISTED));
    }

    @Override
    public List<Chat> findAllChatByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return chatRepository.findChatByUserId(user.getUserId());
    }

    @Override
    public Chat createGroup(GroupChatRequest request, Long userReq) {
        User user = userRepository.findById(userReq).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Chat chat = new Chat();
        chat.setGroup(true);
        chat.setChatName(request.getChatName());
        chat.setCreatedBy(user);
        chat.getAdmins().add(user);

        for (Long userId : request.getUserIds()){
            User userGroup = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            chat.getUsers().add(userGroup);
        }
        return chatRepository.save(chat);
    }

    @Override
    public Chat addUserToGroup(Long userId, Long chatId, User userReq) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new AppException(ErrorCode.CHAT_NOT_EXISTED));
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if(chat.getAdmins().contains(userReq)){
            chat.getUsers().add(user);
        }
        else throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);

        return chatRepository.save(chat);
    }

    @Override
    public void renameGroup(Long chatId, String groupName, User userReq) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new AppException(ErrorCode.CHAT_NOT_EXISTED));
        if(chat.getUsers().contains(userReq)){
            chat.setChatName(groupName);
            chatRepository.save(chat);
        }
        else throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);
    }

    @Override
    public Chat removeFromGroup(Long chatId, Long userId, User userReq) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new AppException(ErrorCode.CHAT_NOT_EXISTED));
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(chat.getAdmins().contains(userReq)){
            chat.getUsers().remove(user);
        } else if (chat.getUsers().contains(userReq)) {
            if(user.getUserId().equals(userReq.getUserId())){
                chat.getUsers().remove(user);
            }
        }
        else throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);

        return chatRepository.save(chat);
    }

    @Override
    public void deleteChat(Long chatId, Long userId) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new AppException(ErrorCode.CHAT_NOT_EXISTED));
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(chat.getAdmins().contains(user)){
            chatRepository.delete(chat);
        }
        else throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);
    }
}
