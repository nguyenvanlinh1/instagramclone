package com.nvl.ins_be.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "message_id")
    Long messageId;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    User receiver;

    @Column(name = "content", nullable = false)
    String content;

    LocalDateTime createdAt;
}
