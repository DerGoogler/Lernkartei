package com.dergoogler.core;

import android.app.Activity;
import android.os.Environment;
import android.webkit.JavascriptInterface;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

public class NativeFile {
    public final File ext = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS);
    private final Activity ctx;

    public NativeFile(Activity ctx) {
        this.ctx = ctx;
    }

    private void createCreate(File file, String content) {
        try {
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(content.getBytes());
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public void create(String file, String content) {
        File d = new File(ext + "/Kartei/");
        File f = new File(ext + "/Kartei/", file);
        if (!d.exists()) {
            if (d.mkdirs()) {
                createCreate(f, content);
            }
        } else {
            createCreate(f, content);
        }

    }

    @JavascriptInterface
    public String list() {
        String[] modules = new File(ext + "/Kartei/").list();
        return String.join(",", modules);
    }

    @JavascriptInterface
    public boolean exists(String file) {
        File f = new File(ext + "/Kartei/" + file);
        return f.exists();
    }

    @JavascriptInterface
    public boolean isDirectory(String file) {
        File f = new File(ext + "/Kartei/" + file);
        return f.isDirectory();
    }

    private String createRead(File readfile) {
        StringBuilder text = new StringBuilder();
        try {
            BufferedReader br = new BufferedReader(new FileReader(readfile));
            String line;

            while ((line = br.readLine()) != null) {
                text.append(line);
                text.append('\n');
            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return text.toString();
    }

    @JavascriptInterface
    public String read(String file) {

        File readfile = new File(ext + "/Kartei/" + file);
        return createRead(readfile);
    }
}
