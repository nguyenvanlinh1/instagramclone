package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Chat;
import com.nvl.ins_be.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("Select m from Message m join m.chat c where c.chatId = :chatId")
    List<Message> findByChatId(@Param("chatId") Long chatId);
}
