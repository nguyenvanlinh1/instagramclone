package com.nvl.ins_be.dto.request.SendEmail;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Receive {
    String name;
    String email;
}
