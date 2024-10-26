package com.nvl.ins_be.controller.Realtime;

import com.nvl.ins_be.model.CommentPost;
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
public class RealtimeCommentController {

    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/comment")
    @SendTo("/topic/public")
    public CommentPost createComment(@Payload CommentPost commentPost){
        simpMessagingTemplate.convertAndSend("/topic/public", commentPost);
        return commentPost;
    }

    @MessageMapping("/comment/delete")
    @SendTo("/topic/public/delete")
    public Long deleteComment(@Payload Long commentId){
        simpMessagingTemplate.convertAndSend("/topic/public/delete", commentId);
        return commentId;
    }
}
