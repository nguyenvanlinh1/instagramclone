package com.nvl.ins_be.dto.request;

import com.nvl.ins_be.model.ImagePost;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StoryRequest {

    String caption;
    List<ImageRequest> images = new ArrayList<>();
}
