package com.dergoogler.core;

import android.webkit.JavascriptInterface;

import com.dergoogler.kartei.BuildConfig;

public class NativeBuildConfig {
    @JavascriptInterface
    public boolean DEBUG() {
        return BuildConfig.DEBUG;
    }

    @JavascriptInterface
    public String APPLICATION_ID() {
        return BuildConfig.APPLICATION_ID;
    }

    @JavascriptInterface
    public String BUILD_TYPE() {
        return BuildConfig.BUILD_TYPE;
    }

    @JavascriptInterface
    public int VERSION_CODE() {
        return BuildConfig.VERSION_CODE;
    }

    @JavascriptInterface
    public String VERSION_NAME() {
        return BuildConfig.VERSION_NAME;
    }
}
