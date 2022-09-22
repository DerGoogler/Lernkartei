package com.dergoogler.kartei;

import java.io.IOException;

import fi.iki.elonen.NanoHTTPD;

public class Server extends NanoHTTPD {
    public static final int PORT = 4765;
    private final String content;

    public Server(String content) throws IOException {
        super(PORT);
        this.content = content;
    }

    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();

        if (uri.equals("/cards.json")) {
            return newFixedLengthResponse(Response.Status.OK, "application/json", content);
        }
        return null;
    }
}