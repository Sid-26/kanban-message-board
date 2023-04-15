package com.example.util;

import org.json.JSONObject;

public class Note {
    String text;
    String creator;

    public Note(String text, String creator) {
        this.text = text;
        this.creator = creator;
    }

    public static Note jsonToNote(JSONObject note){
        return new Note(note.getString("text"),note.getString("creator"));
    }
}
