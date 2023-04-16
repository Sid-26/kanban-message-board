package com.example.util;

import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Objects;

public class Loader {
    // Source: https://kodejava.org/how-do-i-read-json-file-using-json-java-org-json-library/
    private static String readFromInputStream(InputStream inputStream)
            throws IOException {
        StringBuilder resultStringBuilder = new StringBuilder();
        try (BufferedReader br
                     = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = br.readLine()) != null) {
                resultStringBuilder.append(line).append("\n");
            }
        }
        return resultStringBuilder.toString();
    }
    public static String load(String resourceFile) {
        String data;
        try {
            data = readFromInputStream(Loader.class.getClassLoader().getResourceAsStream(resourceFile));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return data;
    }
}
