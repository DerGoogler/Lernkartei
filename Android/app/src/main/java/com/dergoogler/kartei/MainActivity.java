package com.dergoogler.kartei;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

import com.dergoogler.component.ModuleChromeClient;
import com.dergoogler.component.ModuleView;
import com.dergoogler.core.NativeBuildConfig;
import com.dergoogler.core.NativeFile;
import com.dergoogler.core.NativeOS;
import com.dergoogler.core.NativeSharedPreferences;
import com.dergoogler.core.NativeUtils;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private ModuleView view;
    private static Context mContext;
    private NativeSharedPreferences nsp;
    private Server server;


    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContext = getApplicationContext();
        view = findViewById(R.id.mmrl_view);

        nsp = new NativeSharedPreferences(this);
        try {
            server = new Server(nsp.getString("katei", "[]"));
            server.start();
        } catch (IOException e) {
            e.printStackTrace();
        }

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
        view.addJavascriptInterface(new NativeSharedPreferences(this), "sharedpreferences");
        view.addJavascriptInterface(new NativeBuildConfig(), "buildconfig");
        view.addJavascriptInterface(nsp, "environment");
        view.addJavascriptInterface(new NativeFile(), "file");
        view.addJavascriptInterface(new NativeUtils(), "utils");

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        view.setWebViewClient(new WebViewClientCompat() {
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
    public void onDestroy() {
        super.onDestroy();
        server.stop();
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

    public static Context getAppContext() {
        return mContext;
    }
}
