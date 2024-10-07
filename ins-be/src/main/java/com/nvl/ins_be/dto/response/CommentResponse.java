package com.nvl.ins_be.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nvl.ins_be.model.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

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
    List<CommentPost> replayComment;
    LocalDateTime createAt;
}
