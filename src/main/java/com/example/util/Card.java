package com.example.util;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

public class Card {
    String title;
    ArrayList<Note> notes;
    String creator;

    public Card(String title, ArrayList<Note> notes, String creator) {
        this.title = title;
        this.notes = notes;
        this.creator = creator;
    }

    public static Card jsonToCard(JSONObject card){
        ArrayList<Note> notes = new ArrayList<>();
        JSONArray notesObj = card.getJSONArray("notes");
        for(int i = 0; i < notesObj.length(); i++){
            notes.add(Note.jsonToNote(notesObj.getJSONObject(i)));
        }
        return new Card(card.getString("title"),
                notes,
                card.getString("creator"));
    }
}
