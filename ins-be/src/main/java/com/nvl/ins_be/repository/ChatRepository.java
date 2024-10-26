package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Chat;
import com.nvl.ins_be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("Select c from Chat c join c.users u where u.userId=:userId")
    List<Chat> findChatByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM Chat c WHERE c.isGroup = false AND :user MEMBER OF c.users AND :reqUser MEMBER OF c.users")
    boolean findSingleChatByUserId(@Param("user") User user, @Param("reqUser") User reqUser);
}
