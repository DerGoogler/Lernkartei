package com.dergoogler.kartei;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.component.ModuleView;
import com.dergoogler.core.WebViewOS;
import com.dergoogler.core.WebViewPrefs;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private ModuleView view;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        view = findViewById(R.id.mmrl_view);

        // Options
        view.setJavaScriptEnabled(true);
        view.setAllowFileAccess(true);
        view.setAllowContentAccess(true);
        view.setAllowFileAccessFromFileURLs(true);
        view.setAllowUniversalAccessFromFileURLs(true);
        view.setDatabaseEnabled(true);
        view.setDomStorageEnabled(false);
        view.setUserAgentString(Native.getUserAgent);

        // Content
        view.loadHTML(Native.getBaseURL, Native.getPage);

        // Core
        view.addJavascriptInterface(new WebViewOS(this), Native.getNosString);
        view.addJavascriptInterface(new WebViewPrefs(this), Native.getSharedPrefString);

        view.setDownloadListener((url, userAgent, contentDisposition, mimetype, contentLength) -> {
            DownloadManager.Request request = new DownloadManager.Request(
                    Uri.parse(url));

            request.allowScanningByMediaScanner();
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED); //Notify client once download is completed!
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "/Kartei");
            DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            dm.enqueue(request);
            Toast.makeText(getApplicationContext(), "Downloading File", //To notify the Client that the file is being downloaded
                    Toast.LENGTH_LONG).show();

        });
    }

    @Override
    public void onBackPressed() {
        view.eventDispatcher("onbackbutton");
    }
}
