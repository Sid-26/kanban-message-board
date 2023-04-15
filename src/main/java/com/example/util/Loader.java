package com.example.util;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Objects;

public class Loader {
    public static File load(String resourceFile) {

        URI fileURI = null;
        try {
            fileURI = Objects.requireNonNull(Loader.class
                    .getClassLoader()
                    .getResource("boards.json"))
                    .toURI();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
        return new File(fileURI);
    }
}
