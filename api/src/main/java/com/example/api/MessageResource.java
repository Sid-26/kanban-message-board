package com.example.api;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/message")
public class MessageResource {
    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello, World!";
    }
}