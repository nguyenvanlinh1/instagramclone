package com.nvl.ins_be.service;

import com.nvl.ins_be.dto.request.SendEmail.SendEmailRequest;
import com.nvl.ins_be.dto.response.EmailResponse;

public interface EmailService {
    EmailResponse sendEmail(SendEmailRequest request);
}
