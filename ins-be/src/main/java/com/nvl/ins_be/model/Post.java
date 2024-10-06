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

//    @Embedded
//    @AttributeOverrides({
//            @AttributeOverride(name = "username", column = @Column(name = "username")),
//            @AttributeOverride(name = "user_image", column = @Column(name = "user_image"))
//    })
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
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
    Set<Comment> comments;

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;

    @Column(name = "update_at")
    @UpdateTimestamp
    LocalDateTime updateAt;
}
