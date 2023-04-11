package com.example.api;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@ServerEndpoint(value="/ws/{boardId}")
public class SocketServer {
    final private static Map<String, String> boardList = new HashMap<>();
    final private static Map<String,String> roomHistoryList = new HashMap<>();
    @OnOpen
    public void open(@PathParam("boardId") String boardId, Session session) throws IOException {
        boardList.put(session.getId(), boardId);
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
