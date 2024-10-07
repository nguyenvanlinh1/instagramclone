package com.nvl.ins_be.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "image_post")
public class ImagePost {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_post_id")
    Long imageId;

    @Column(name = "image_url")
    String imageUrl;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    @JsonIgnore
    private Post post;

}
