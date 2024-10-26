package com.nvl.ins_be.exception;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED_ACTION(1111, "Unauthorized action", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1001, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1002, "User not existed", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1012, "User not found", HttpStatus.NOT_FOUND),
    NOT_EMPTY(1003, "Data cannot be empty", HttpStatus.BAD_REQUEST),
    ERROR_FORMAT(1004, "Error format", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1005, "Password must be at least 6 characters", HttpStatus.BAD_REQUEST),
    POST_EXISTED(1007, "Post existed", HttpStatus.BAD_REQUEST),
    POST_NOT_EXISTED(1008, "Post not existed", HttpStatus.BAD_REQUEST),
    STORY_EXISTED(1007, "Story existed", HttpStatus.BAD_REQUEST),
    STORY_NOT_EXISTED(1008, "Story not existed", HttpStatus.BAD_REQUEST),
    COMMENT_EXISTED(1007, "Comment existed", HttpStatus.BAD_REQUEST),
    COMMENT_NOT_EXISTED(1008, "Comment not existed", HttpStatus.BAD_REQUEST),
    USER_ALREADY_FOLLOWED(1011, "User already followed", HttpStatus.BAD_REQUEST),
    USER_NOT_ALREADY_FOLLOWED(1012, "User not already followed", HttpStatus.BAD_REQUEST),
    CHAT_NOT_EXISTED(1013, "Chat not existed", HttpStatus.NOT_FOUND),
    CHAT_EXISTED(1014, "Chat existed", HttpStatus.BAD_REQUEST),
    MESSAGE_NOT_EXISTED(1015, "Message not existed", HttpStatus.NOT_FOUND),
    CANNOT_SEND_EMAIL(1234, "Can not send email", HttpStatus.BAD_REQUEST)
    ;

    int code;
    String message;
    HttpStatusCode statusCode;
}
