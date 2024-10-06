package com.nvl.ins_be.dto.request;

import com.nvl.ins_be.model.Image;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StoryRequest {

    String caption;
    Set<Image> images;
}
