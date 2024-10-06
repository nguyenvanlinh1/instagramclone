package com.nvl.ins_be.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    Long userId;

    @Column(name = "username")
    String username;

    @Column(name = "password")
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;

    @Column(name = "user_email")
    String email;

    @Column(name = "full_name")
    String fullName;

    @Column(name = "user_image")
    String userImage;

    @Column(name = "gender")
    String gender;

    @Column(name = "bio")
    String bio;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Post> posts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Comment> comments;

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Follow> followers;

    @OneToMany(mappedBy = "followed", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Follow> followings;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Message> sentMessage;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Message> receivedMessages;

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;

    @Column(name = "update_at")
    @UpdateTimestamp
    LocalDateTime updateAt;
}
