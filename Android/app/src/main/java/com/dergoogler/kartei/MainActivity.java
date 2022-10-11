package com.dergoogler.kartei;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

import com.dergoogler.component.ModuleChromeClient;
import com.dergoogler.component.ModuleView;
import com.dergoogler.core.NativeBuildConfig;
import com.dergoogler.core.NativeFile;
import com.dergoogler.core.NativeOS;
import com.dergoogler.core.NativeStorage;
import com.dergoogler.core.NativeUtils;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private ModuleView view;


    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        view = findViewById(R.id.mmrl_view);

        view.loadUrl("https://appassets.androidplatform.net/assets/web/index.html");

        // Options
        view.setJavaScriptEnabled(true);
        view.setAllowFileAccess(true);
        view.setAllowContentAccess(true);
        view.setAllowFileAccessFromFileURLs(true);
        view.setAllowUniversalAccessFromFileURLs(true);
        view.setDatabaseEnabled(true);
        view.setDomStorageEnabled(false);
        view.setUserAgentString("KARTEI");

        WebSettings webViewSettings = view.getSettings();
        webViewSettings.setAllowFileAccessFromFileURLs(false);
        webViewSettings.setAllowUniversalAccessFromFileURLs(false);
        webViewSettings.setAllowFileAccess(false);
        webViewSettings.setAllowContentAccess(false);

        // Core
        view.addJavascriptInterface(new NativeOS(this), "os");
        view.addJavascriptInterface(new NativeStorage(this), "nativeStorage");
        view.addJavascriptInterface(new NativeBuildConfig(), "buildconfig");
        view.addJavascriptInterface(new NativeStorage(this), "environment");
        view.addJavascriptInterface(new NativeFile(this), "file");
        view.addJavascriptInterface(new NativeUtils(), "utils");

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        view.setModuleViewClient(new WebViewClientCompat() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }
        });

        view.setModuleChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {

                switch (consoleMessage.messageLevel()) {
                    case TIP:
                        Log.v(TAG, consoleMessage.message());
                        break;
                    case LOG:
                        Log.i(TAG, consoleMessage.message());
                        break;
                    case WARNING:
                        Log.w(TAG, consoleMessage.message());
                        break;
                    case ERROR:
                        Log.e(TAG, consoleMessage.message());
                        break;
                    case DEBUG:
                        Log.d(TAG, consoleMessage.message());
                        break;
                }
                return super.onConsoleMessage(consoleMessage);
            }
        });
    }

    @Override
    public void onResume() {
        super.onResume();
        view.eventDispatcher("onresume");
    }

    @Override
    public void onBackPressed() {
        view.eventDispatcher("onbackbutton");
    }
}
