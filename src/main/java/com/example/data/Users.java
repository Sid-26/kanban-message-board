package com.example.data;

import java.util.ArrayList;
import java.util.HashMap;

public class Users {
    protected static HashMap<String, String> accounts = new HashMap<>() {{
        put("admin","admin");
    }};

    public static boolean createAccount(String username, String password) throws RuntimeException {
        if (!(username.equals("") || password.equals(""))) {
            accounts.put(username, password);
            return true;
        } else {
            throw new RuntimeException();
        }
    }
    // .get(username) = "pickachu", String password = pickachu, .get(username) = password
    public static boolean isValid(String username, String password) {
        return accounts.get(username).equals(password);
    }
}
