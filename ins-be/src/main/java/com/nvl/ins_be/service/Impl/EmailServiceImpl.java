package com.nvl.ins_be.service.Impl;

import com.nvl.ins_be.dto.request.SendEmail.EmailRequest;
import com.nvl.ins_be.dto.request.SendEmail.SendEmailRequest;
import com.nvl.ins_be.dto.request.SendEmail.Sender;
import com.nvl.ins_be.dto.response.EmailResponse;
import com.nvl.ins_be.exception.AppException;
import com.nvl.ins_be.exception.ErrorCode;
import com.nvl.ins_be.repository.HttpClient.EmailClient;
import com.nvl.ins_be.service.EmailService;
import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailServiceImpl implements EmailService {
    EmailClient emailClient;

    @NonFinal
    @Value("${email.apiKey}")
    protected String API_KEY;

    @Override
    public EmailResponse sendEmail(SendEmailRequest request) {

        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("NguyenVanLinh")
                        .email("nvanlinh1406@gmail.com")
                        .build())
                .to(List.of(request.getTo()))
                .subject(request.getSubject())
                .htmlContent(request.getHtmlContent())
                .build();

        try {
            return emailClient.sendEmail(API_KEY, emailRequest);
        }
        catch (FeignException e) {
            throw  new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }
}
