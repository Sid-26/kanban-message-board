package com.example.api;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;

@ServerEndpoint(value="/ws")
public class SocketServer {
    @OnOpen
    public void open(Session session) throws IOException {
        session.getBasicRemote().sendText("{\"id\":\""+session.getId()+"\"}");
    }

    @OnClose
    public void close(Session session){

    }

    @OnMessage
    public void message(String message, Session session){
        System.out.println(message);
    }
}
