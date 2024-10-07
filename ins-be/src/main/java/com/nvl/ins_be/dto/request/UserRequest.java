package com.nvl.ins_be.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRequest {

    @Email(message = "ERROR_FORMAT")
    @NotEmpty(message = "NOT_EMPTY")
    String email;

    @Size(min = 6, message = "INVALID_PASSWORD")
    @NotEmpty(message = "NOT_EMPTY")
    String password;

    String username;
    String fullName;
    String userImage;
    String gender;
    String bio;
}
