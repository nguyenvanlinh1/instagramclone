package com.nvl.ins_be.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_id")
    Long postId;

    @Column(name = "caption")
    String caption;

    @OneToMany
    List<Image> imageList = new ArrayList<>();

    @Column(name = "location")
    String location;

    @Column(name = "status")
    String status;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "user_id", column = @Column(name = "user_id")),
            @AttributeOverride(name = "user_email", column = @Column(name = "user_email"))
    })
    User user;

    @Embedded
    @ElementCollection
    @JoinTable(name = "likedByUsers", joinColumns = @JoinColumn(name = "user_id"))
    Set<User> likedByUsers = new HashSet<>();

    @Embedded
    @ElementCollection
    @JoinTable(name = "sharedByUsers", joinColumns = @JoinColumn(name = "user_id"))
    Set<User> sharedByUsers = new HashSet<>();

    @Embedded
    @ElementCollection
    @JoinTable(name = "savedByUsers", joinColumns = @JoinColumn(name = "user_id"))
    Set<User> savedByUsers = new HashSet<>();

    @OneToMany
    List<Comment> commentList = new ArrayList<>();

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;

    @Column(name = "update_at")
    @UpdateTimestamp
    LocalDateTime updateAt;
}
