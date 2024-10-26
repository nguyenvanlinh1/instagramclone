package com.nvl.ins_be.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "follow_id")
    Long followId;

    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
    User follower;

    @ManyToOne
    @JoinColumn(name = "followed_id", nullable = false)
    User followed;

    @Column(name = "create_at")
    @CreationTimestamp
    LocalDateTime createAt;

}
