package com.example.webboards;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.*;
import com.example.data.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@ServerEndpoint(value="/ws/{userId}")
public class SocketServer {
    private static Map<String,String> users = new HashMap<>();
    @OnOpen
    public void open(@PathParam("userId") String userId, Session session) throws IOException, URISyntaxException {
        users.put(session.getId(), userId);
        // Get all the user's boardIds and return them
        JSONObject resp = new JSONObject();
        JSONArray boardIds = (new JSONObject(Loader.load("users-boards.json")))
                .getJSONArray(userId);
        resp.put("boards",boardIds);
        session.getBasicRemote().sendText(resp.toString());
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
