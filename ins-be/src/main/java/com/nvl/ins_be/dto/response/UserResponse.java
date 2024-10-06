package com.nvl.ins_be.dto.response;

import com.nvl.ins_be.model.Image;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {

    Long userId;
    String email;
    String username;
    String fullName;
    String userImage;
    String gender;
    String bio;
    LocalDateTime createAt;
    LocalDateTime updateAt;
}
