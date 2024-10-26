package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    @Query("Select u from User u where u.username LIKE %:name% or u.fullName LIKE %:name% ")
    List<User> findUserByName(@Param("name") String name);

    @Query("SELECT u FROM User u LEFT JOIN Follow f ON f.followed.userId = u.userId AND f.follower.userId = :userId WHERE f.followed IS NULL AND u.userId <>:userId")
    List<User> findUserByNotFollow(@Param("userId") Long userId);

    User findUserByUsername(@Param("username") String username);

}
