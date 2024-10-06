package com.nvl.ins_be.repository;

import com.nvl.ins_be.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
