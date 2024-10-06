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
    INVALID_PASSWORD(1005, "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    POST_EXISTED(1007, "Post existed", HttpStatus.BAD_REQUEST),
    POST_NOT_EXISTED(1008, "Post not existed", HttpStatus.BAD_REQUEST),
    STORY_EXISTED(1007, "Story existed", HttpStatus.BAD_REQUEST),
    STORY_NOT_EXISTED(1008, "Story not existed", HttpStatus.BAD_REQUEST),
    COMMENT_EXISTED(1007, "Comment existed", HttpStatus.BAD_REQUEST),
    COMMENT_NOT_EXISTED(1008, "Comment not existed", HttpStatus.BAD_REQUEST),
    USER_ALREADY_FOLLOWED(1011, "User already followed", HttpStatus.BAD_REQUEST),
    USER_NOT_ALREADY_FOLLOWED(1012, "User not already followed", HttpStatus.BAD_REQUEST)
    ;

    int code;
    String message;
    HttpStatusCode statusCode;
}
