package com.nvl.ins_be.dto.response;

import com.nvl.ins_be.model.Image;
import com.nvl.ins_be.model.User;
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
public class StoryResponse {

    Long storyId;
    String caption;
    Set<Image> images = new LinkedHashSet<>();
    LocalDateTime createAt;
    User user;
}
