package com.nvl.ins_be.exception;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class AppException extends RuntimeException{
    ErrorCode errorCode;
}
