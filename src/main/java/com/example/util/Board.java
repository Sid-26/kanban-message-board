package com.example.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.*;

public class Board {
    String title;
    List<Note> notes;
    public Board(String title, List<Note> notes){
        this.title = title;
        this.notes = notes;
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
        JSONArray notesObj = board.getJSONArray("notes");
        ArrayList<Note> notes = new ArrayList<>();
        if(notesObj != null){
            for(int i = 0; i < notesObj.length(); i++){
                JSONObject note = notesObj.getJSONObject(i);
                notes.add(new Note(note.getString("title"),
                        note.getString("text"),
                        note.getString("creator")
                ));
            }
        }
        return new Board(board.getString("title"),notes);
    }

    public static HashMap<String,Board> loadAllBoards(String resourceFile){

    }
}
