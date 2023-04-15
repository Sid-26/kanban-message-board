package com.example.util;

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
        String pwd = accounts.get(username);
        if(pwd == null){
            return false;
        }
        return pwd.equals(password);
    }

    public static HashMap<String, String> getAccounts() {
        return accounts;
    }
}
