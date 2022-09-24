package com.dergoogler.core;

import android.webkit.JavascriptInterface;

public class NativeUtils {

    @JavascriptInterface
    public void runtimeException(String message) {
        throw new RuntimeException(message);
    }

    @JavascriptInterface
    public void exception(String message) throws Exception {
        throw new Exception(message);
    }
}
