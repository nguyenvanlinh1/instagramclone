package com.nvl.ins_be.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.*;

@Slf4j
public class TestWebsocket implements WebSocketHandler {
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("Connection established on session: {}", session.getId());
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String data = (String) message.getPayload();
        log.info("Message: {}", data);
        session.sendMessage(new TextMessage("Start processing" + session + " - " + data));
        Thread.sleep(1000);
        session.sendMessage(new TextMessage("Completed"));
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.info("Exception");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("Connection");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
