package com.example.webboards;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.*;
import com.example.util.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@ServerEndpoint(value="/ws/{userId}")
public class SocketServer {
    // Resource file names
    private final String boardsFile = "boards.json";

    // for single-board test case
    private final String singleBoardId = "board";
    private Board singleBoard = Board.loadBoard(boardsFile,singleBoardId);
    // session to userId
    private static Map<String,String> users = new HashMap<>();
    // userId to boardId
    // private static Map<String,String> usersBoards = new HashMap<>();
    // private static Map<String,Board> boards = Board.loadAllBoards("boards.json");
    @OnOpen
    public void open(@PathParam("userId") String userId, Session session) throws IOException, URISyntaxException {
        users.put(session.getId(), userId);

//        // Get all the user's boardIds and return them
//        JSONObject resp = new JSONObject();
//        JSONArray boardIds = (new JSONObject(Loader.load("users-boards.json")))
//                .getJSONArray(userId);
//        resp.put("boards",boardIds);
//        session.getBasicRemote().sendText(resp.toString());

        // return current state of board from file (single board)
        JSONObject resp = new JSONObject().put("board",singleBoard.toJSON());
        session.getBasicRemote().sendText(resp.toString());
    }

    @OnClose
    public void close(Session session){

    }

    @OnMessage
    public void message(String comm, Session session) throws IOException {
        JSONObject message = new JSONObject(comm);
        String type = message.getString("type");
        String response;
        switch(type){
            // Create new card
            case "new-card":
                singleBoard.addCard(Card.jsonToCard(message));
                messageAll(session,message.toString());
                break;
            // create new note
            case "new-note":
                singleBoard.getCards().get(message.getInt("card"))
                        .addNote(new Note(message.getString("text"),message.getString("creator")));
                messageAll(session, message.toString());
                break;
            // delete note with index
            case "delete-note":
                singleBoard.getCards().get(message.getInt("card")).deleteNote(message.getInt("note"));
                messageAll(session, message.toString());
                break;
            // delete card with index
            case "delete-card":
                singleBoard.getCards().remove(message.getInt("card"));
                messageAll(session, message.toString());
                break;
            default:
                session.getBasicRemote().sendText("{\"type\":\"error\", \"text\":\"type not defined\"}");
        }
    }

    public void messageAll(Session session,String message) throws IOException {
        for(Session peer : session.getOpenSessions()){
            peer.getBasicRemote().sendText(message);
        }
    }
}
