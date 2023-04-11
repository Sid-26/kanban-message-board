package com.example.api;
import org.json.JSONArray;
import org.json.JSONObject;

public class FileFormatter {
    public static String toJSON(Notes[] notes) {
        JSONArray array = new JSONArray(); // initialize an array for json

        for (Notes note : notes) { // iterate through all notes
            JSONObject obj = new JSONObject(); // create new json object

            // whatever data members of Notes exist add it in obj
            obj.put("id",note.getId()); // add id
            obj.put("body",note.getBody()); // add text body to object

            array.put(obj); // put the final object { id: id, body: "body" } in array
        }

        JSONObject finalJSON = new JSONObject();
        finalJSON.put("notes",array); // put the array inside a json

        return finalJSON.toString(); // return the final json object as a string
    }
}
