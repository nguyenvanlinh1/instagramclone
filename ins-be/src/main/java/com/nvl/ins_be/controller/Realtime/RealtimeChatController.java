package com.nvl.ins_be.controller.Realtime;

import com.nvl.ins_be.model.Message;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class RealtimeChatController {

    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/group/public")
    public Message reciveMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSend("/group/" + message.getChat().getChatId().toString(), message);
        return message;
    }

    @MessageMapping("/message/delete")
    @SendTo("/group/public")
    public void deleteMessage(){
        simpMessagingTemplate.convertAndSend("/group/delete", "Delete Successfully");
//        log.info("Sent delete message with ID: {}", messageId);
    }
}
