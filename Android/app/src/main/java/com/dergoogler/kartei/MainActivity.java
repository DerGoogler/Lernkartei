package com.dergoogler.kartei;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.dergoogler.core.NativeBuildConfig;
import com.dergoogler.core.NativeFile;
import com.dergoogler.core.NativeOS;
import com.dergoogler.core.NativeStorage;
import com.dergoogler.core.NativeUtils;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewImpl;
import org.apache.cordova.CoreAndroid;
import org.apache.cordova.LOG;
import org.apache.cordova.engine.SystemWebView;
import org.apache.cordova.engine.SystemWebViewEngine;


public class MainActivity extends CordovaActivity {
    private static final String TAG = "MainActivity";


    @SuppressLint("SetJavaScriptEnabled")
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();

        WebView wv = (WebView) appView.getEngine().getView();
        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);

        WebSettings webViewSettings = wv.getSettings();
        // Options
        webViewSettings.setJavaScriptEnabled(true);
        webViewSettings.setAllowFileAccess(true);
        webViewSettings.setAllowContentAccess(true);
        webViewSettings.setAllowFileAccessFromFileURLs(true);
        webViewSettings.setAllowUniversalAccessFromFileURLs(true);
        webViewSettings.setDatabaseEnabled(true);
        webViewSettings.setDomStorageEnabled(false);
        webViewSettings.setUserAgentString("KARTEI");
        webViewSettings.setAllowFileAccessFromFileURLs(false);
        webViewSettings.setAllowUniversalAccessFromFileURLs(false);
        webViewSettings.setAllowFileAccess(false);
        webViewSettings.setAllowContentAccess(false);

        // Core
        wv.addJavascriptInterface(new NativeOS(this), "os");
        wv.addJavascriptInterface(new NativeStorage(this), "nativeStorage");
        wv.addJavascriptInterface(new NativeBuildConfig(), "buildconfig");
        wv.addJavascriptInterface(new NativeStorage(this), "environment");
        wv.addJavascriptInterface(new NativeFile(this), "file");
        wv.addJavascriptInterface(new NativeUtils(), "utils");
    }

}
