package com.nvl.ins_be.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "chat_id")
    Long chatId;

    @Column(name="chat_name")
    String chatName;

    @ManyToMany
    Set<User> admins = new LinkedHashSet<>();

    @Column(name = "is_group")
    boolean isGroup;

    @JoinColumn(name = "created_by", nullable = false)
    @ManyToOne
    User createdBy;

    @ManyToMany
    Set<User> users = new LinkedHashSet<>();

    @OneToMany
    List<Message> messages = new ArrayList<>();
}
