package com.example.util;

import java.util.HashMap;

public class Users {
    protected static HashMap<String, String> accounts = new HashMap<>() {{
        put("admin","admin");
    }};

    public void createAccount(String username, String password) {
        accounts.put(username,password);
    }
    public static boolean isValid(String username, String password) {
        return accounts.get(username).equals(password);
    }
}
