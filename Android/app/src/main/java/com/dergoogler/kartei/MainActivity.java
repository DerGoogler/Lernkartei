package com.dergoogler.kartei;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.text.format.Formatter;
import android.util.Log;
import android.webkit.ConsoleMessage;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.component.ModuleChromeClient;
import com.dergoogler.component.ModuleView;
import com.dergoogler.core.NativeBuildConfig;
import com.dergoogler.core.NativeEnvironment;
import com.dergoogler.core.NativeFile;
import com.dergoogler.core.NativeOS;
import com.dergoogler.core.NativeSharedPreferences;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private ModuleView view;
    private static Context mContext;


    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContext = getApplicationContext();
        view = findViewById(R.id.mmrl_view);

        // Options
        view.setJavaScriptEnabled(true);
        view.setAllowFileAccess(true);
        view.setAllowContentAccess(true);
        view.setAllowFileAccessFromFileURLs(true);
        view.setAllowUniversalAccessFromFileURLs(true);
        view.setDatabaseEnabled(true);
        view.setDomStorageEnabled(false);
        view.setUserAgentString("KARTEI");

        // Content
        view.loadUrl("file:///android_asset/web/index.html");

        // Core
        view.addJavascriptInterface(new NativeOS(this), "os");
        view.addJavascriptInterface(new NativeSharedPreferences(this), "sharedpreferences");
        view.addJavascriptInterface(new NativeBuildConfig(), "buildconfig");
        view.addJavascriptInterface(new NativeEnvironment(this), "environment");
        view.addJavascriptInterface(new NativeFile(), "file");

        view.setModuleChromeClient(new ModuleChromeClient() {
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
    public void onBackPressed() {
        view.eventDispatcher("onbackbutton");
    }

    public static Context getAppContext() {
        return mContext;
    }
}
