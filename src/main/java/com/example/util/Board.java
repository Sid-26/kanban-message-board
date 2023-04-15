package com.example.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.json.*;

public class Board {
    String title;
    List<Card> cards;
    public Board(String title, List<Card> cards){
        this.title = title;
        this.cards = cards;
    }

    public void addCard(Card card){
        this.cards.add(card);
    }

    public JSONObject toJSON(){
        JSONObject board = new JSONObject();
        board.put("title",this.title);
        board.put("cards",new JSONArray(this.cards));
        return board;
    }

    /**
     * Given the boardId of a board and the name of the boards file in resources,
     * returns a new Board object containing the data in the file.
     * @param boardId
     * @param resourceFile
     * @return
     */
    public static Board loadBoard(String resourceFile, String boardId){
        JSONObject board = new JSONObject(Loader.load(resourceFile)).getJSONObject(boardId);
        return jsonToBoard(board);
    }

    public static Board jsonToBoard(JSONObject board){
        JSONArray cardsObj = board.getJSONArray("cards");
        ArrayList<Card> cards = new ArrayList<>();
        if(cardsObj != null){
            for(int i = 0; i < cardsObj.length(); i++){
                JSONObject card = cardsObj.getJSONObject(i);
                cards.add(Card.jsonToCard(card));
            }
        }
        return new Board(board.getString("title"), cards);
    }

    public static HashMap<String,Board> loadAllBoards(String resourceFile){
        HashMap<String,Board> boards = new HashMap<>();
        JSONObject boardsObj = new JSONObject(Loader.load(resourceFile));
        Iterator<String> it = boardsObj.keys();
        while(it.hasNext()){
            String boardId = it.next();
            boards.put(boardId,jsonToBoard(boardsObj.getJSONObject(boardId)));
        }
        return boards;
    }

    public ArrayList<Card> getCards() {
        return (ArrayList<Card>) this.cards;
    }
}
