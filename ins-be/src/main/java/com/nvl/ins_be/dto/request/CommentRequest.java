package com.nvl.ins_be.dto.request;

import com.nvl.ins_be.model.Image;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentRequest {

    String content;

}
