package com.nvl.ins_be.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
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
    @NotEmpty
    String username;

    @Column(name = "password")
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
    @JsonIgnore
    Set<Post> posts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    Set<CommentPost> comments;

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Follow> followers;

    @OneToMany(mappedBy = "followed", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Follow> followings;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Message> sentMessage;

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;

    @Column(name = "update_at")
    @UpdateTimestamp
    LocalDateTime updateAt;
}
