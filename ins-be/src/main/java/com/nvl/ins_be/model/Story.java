package com.nvl.ins_be.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Image> imageList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Comment> comments;

    @ManyToMany
    @JoinTable(
            name = "story_like",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> likedStoryByUser;

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;
}
