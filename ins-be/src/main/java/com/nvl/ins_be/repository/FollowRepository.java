package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Follow;
import com.nvl.ins_be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

//    @Query("Select f from Follow f where f.follower_id = :follower and f.followed_id = :followed")
//    Follow findByFollowerAndFollowed(@Param("follower") Long follower, @Param("followed") Long followed);

    Optional<Follow> findByFollowerAndFollowed(User follower, User followed);

    List<Follow> findByFollowed(User followed);
    List<Follow> findByFollower(User follower);

    boolean existsByFollowerAndFollowed(User follower, User followed);
}
