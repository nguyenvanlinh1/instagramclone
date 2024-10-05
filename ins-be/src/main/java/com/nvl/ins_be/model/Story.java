package com.nvl.ins_be.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

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
@Table(name = "story")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "story_id")
    Long storyId;

    @Column(name = "caption")
    String caption;

    @OneToMany
    List<Image> imageList = new ArrayList<>();

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

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;
}