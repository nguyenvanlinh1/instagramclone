package com.nvl.ins_be.controller;

import com.nvl.ins_be.dto.request.SendMessageRequest;
import com.nvl.ins_be.dto.response.ApiResponse;
import com.nvl.ins_be.model.Message;
import com.nvl.ins_be.model.User;
import com.nvl.ins_be.service.MessageService;
import com.nvl.ins_be.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageController {

    UserService userService;
    MessageService messageService;

    @PostMapping("/send")
    ApiResponse<Message> sendMessage(@RequestBody SendMessageRequest request){
        return ApiResponse.<Message>builder()
                .result(messageService.sendMessage(request))
                .build();
    }

    @GetMapping("/chat/{chatId}")
    ApiResponse<List<Message>> getChatMessage(@PathVariable Long chatId){
        User user = userService.getUser();
        return ApiResponse.<List<Message>>builder()
                .result(messageService.getChatMessage(chatId ,user))
                .build();
    }

    @DeleteMapping("/delete/{messageId}")
    ApiResponse<Void> deleteMessage(@PathVariable Long messageId){
        User user = userService.getUser();
        messageService.deleteMessage(messageId, user);
        return ApiResponse.<Void>builder()
                .message("Delete Message Successfully")
                .build();
    }

}
