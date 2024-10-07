package com.nvl.ins_be.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "comment_story")
public class CommentStory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "comment_id")
    Long commentId;

    @Column(name = "content")
    String content;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "story_id", nullable = false)
    @JsonIgnore
    private Story story;

    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
    private CommentStory parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CommentStory> replyComments = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(
            name = "comment_like_story",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> likedCommentByUser;

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;

}
