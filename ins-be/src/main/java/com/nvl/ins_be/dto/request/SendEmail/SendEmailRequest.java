package com.nvl.ins_be.dto.request.SendEmail;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SendEmailRequest {
    Receive to;
    String subject;
    String htmlContent;
}
