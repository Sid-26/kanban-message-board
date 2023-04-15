package com.example.webboards;
import com.example.util.Users;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.HTTP;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(name = "loginServlet", value = "/login-servlet")
public class LoginServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        StringBuffer buffer = new StringBuffer();
        String ln = null;
        // processing post request json
        try {
            BufferedReader read = request.getReader();
            while ((ln = read.readLine()) != null) {
                System.out.println(ln);
                buffer.append(ln);
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        // trying to make a json object

//        JSONObject obj;
//        try {
//            obj = HTTP.toJSONObject(buffer.toString());
//            System.out.println(obj.toString());
//        } catch (JSONException e) {
//            // death
//            e.printStackTrace();
//            throw new RuntimeException();
//        }

        JSONObject obj = new JSONObject(buffer.toString());
        // json looks like {"user":"sid", "pwd": "ABC123"}
        String username = obj.getString("user");
        String password = obj.getString("pwd");
        // to do create a Users class
        boolean loggedin = false;
        try{
            loggedin = Users.isValid(username, password);
        } catch(RuntimeException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("loginStatus",loggedin);
        jsonResponse.put("username",username);
        System.out.println(jsonResponse);
        // sending json response back to client
        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
    }

    public void destroy() {
    }
}
