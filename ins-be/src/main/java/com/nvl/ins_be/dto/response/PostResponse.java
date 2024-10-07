package com.nvl.ins_be.dto.response;

import com.nvl.ins_be.model.ImagePost;
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
public class PostResponse {

    Long postId;
    String caption;
    String location;
    Set<ImagePost> images = new LinkedHashSet<>();
    String status;
    Long userId;
    String username;
    String userImage;
    LocalDateTime createAt;
    LocalDateTime updateAt;
}
