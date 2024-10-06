package com.nvl.ins_be.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nvl.ins_be.model.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentResponse {

    Long commentId;
    String content;
    Post post;
    User user;
    Story story;
    List<Comment> replayComment;
    LocalDateTime createAt;
}
