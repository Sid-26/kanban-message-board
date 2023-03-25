package com.example.api;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

@Path("/format")
public class APIFormatter {
    @POST
    @Path("/json")
    @Produces()
    public Response json(String payload) {
        Notes[] notes;
        // if client didn't send a payload (html)
        if (payload.isEmpty()) {
            return Response.status(400)
                    .entity("No data was passed in payload")
                    .build();
        }

        try {
            notes = Notes.fromHTML(payload); // try extracting array of nodes from html body
        } catch (RuntimeException e) { // wont break because i haven't updated the fromHTML - sid
            System.out.println(e);
            return Response.status(400)
                    .entity("Bad data passed to API")
                    .build();
        }

        String response = FileFormatter.toJSON(notes); // create a string json in file formatter

        // send a json back to the server
        return Response.status(200)
                .entity(response)
                .build();
    }
}
