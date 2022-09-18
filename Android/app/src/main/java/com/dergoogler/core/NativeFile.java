package com.dergoogler.core;

import android.os.Environment;
import android.webkit.JavascriptInterface;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

public class NativeFile {
    private final File ext = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS);

    @JavascriptInterface
    public void create(String file, String content) {
        try {
            File outFile1 = new File(ext + "/Kartei/" + file);
            // Create File
            boolean fileCreated = outFile1.createNewFile();
            if (!fileCreated) {
                Writer overWrite = new BufferedWriter(new OutputStreamWriter(
                        new FileOutputStream(ext + "/Kartei/" + file, true), StandardCharsets.UTF_8), 10240);
                overWrite.write(content);
                overWrite.flush();
                overWrite.close();
            }
            Writer out = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(outFile1, true), StandardCharsets.UTF_8), 10240);
            out.write(content);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    @JavascriptInterface
    public String read(String file) {
        File readfile = new File(ext + "/Kartei/" + file);
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
}
