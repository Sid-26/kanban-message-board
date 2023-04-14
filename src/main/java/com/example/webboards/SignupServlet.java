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

@WebServlet(name = "signupServlet", value = "/signup-servlet")
public class SignupServlet extends HttpServlet {
    public void doPOST(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        StringBuffer buffer = new StringBuffer();
        String ln = null;

        // processing post request json
        try {
            BufferedReader read = request.getReader();
            while ((ln = read.readLine()) != null) {
                buffer.append(ln);
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        // trying to make a json object
        JSONObject obj;
        try {
            obj = HTTP.toJSONObject(buffer.toString());
        } catch (JSONException e) {
            // death
            e.printStackTrace();
            throw new RuntimeException();
        }
        // json looks like {"user":"sid", "pwd": "ABC123"}
        String username = (String) obj.get("user");
        String password = (String) obj.get("pwd");
        // to do create a Users class
        boolean success = false;

        try {
            success = Users.createAccount(username, password);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("success",success);

        // sending json response back to client
        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
    }

    public void destroy() {
    }
}
