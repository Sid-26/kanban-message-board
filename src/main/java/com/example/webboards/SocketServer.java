package com.example.webboards;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.*;

import java.io.IOException;
import java.net.URISyntaxException;

@ServerEndpoint(value="/ws/{boardId}")
public class SocketServer {
    @OnOpen
    public void open(@PathParam("boardId") String boardId, Session session) throws IOException, URISyntaxException {
        // queryString should have a userID
        String userId = session.getQueryString().replaceFirst("id=","");
        // Send back the current state of the board (this is the user initially connecting)



        session.getBasicRemote().sendText("it worked bro");
    }

    @OnClose
    public void close(Session session){

    }

    @OnMessage
    public void message(String comm, Session session){
        JSONObject message = new JSONObject(comm);
        String task = message.get("type").toString();

    }
}
