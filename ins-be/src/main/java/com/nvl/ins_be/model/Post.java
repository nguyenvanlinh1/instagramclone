package com.nvl.ins_be.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<ImagePost> imageList = new LinkedHashSet<>();

    @Column(name = "location")
    String location;

    @Column(name = "status")
    String status;

//    @Embedded
//    @AttributeOverrides({
//            @AttributeOverride(name = "username", column = @Column(name = "username")),
//            @AttributeOverride(name = "user_image", column = @Column(name = "user_image"))
//    })
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    User user;

//    @Embedded
//    @ElementCollection
//    @JoinTable(name = "sharedPostByUsers", joinColumns = @JoinColumn(name = "post_id"))
//    Set<User> sharedByUsers;

    @ManyToMany
    @JoinTable(
            name = "post_save",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> savedByUsers;

    @ManyToMany
    @JoinTable(
            name = "post_like",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> likedByUsers;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<CommentPost> comments;

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;

    @Column(name = "update_at")
    @UpdateTimestamp
    LocalDateTime updateAt;
}
