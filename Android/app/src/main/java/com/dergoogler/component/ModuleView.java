package com.dergoogler.component;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.util.JsonReader;
import android.util.JsonToken;
import android.util.Log;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.util.Map;

public class ModuleView extends WebView {
    private final WebSettings webSettings;
    public final Context ctx;

    public ModuleView(Context context) {
        super(context);
        this.webSettings = this.getSettings();
        this.ctx = context;
        this.init();
    }

    public ModuleView(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.webSettings = this.getSettings();
        this.ctx = context;
        this.init();
    }

    public ModuleView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.webSettings = this.getSettings();
        this.ctx = context;
        this.init();
    }

    public ModuleView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        this.webSettings = this.getSettings();
        this.ctx = context;
        this.init();
    }

    @SuppressLint("JavascriptInterface")
    private void init() {
        this.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        this.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webSettings.setRenderPriority(WebSettings.RenderPriority.HIGH);
        webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webSettings.setAppCacheEnabled(true);
        webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);
        webSettings.setUseWideViewPort(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setSaveFormData(true);
        webSettings.setSaveFormData(true);
        webSettings.setEnableSmoothTransition(true);
    }

    @SuppressLint("SetJavaScriptEnabled")
    public void setJavaScriptEnabled(boolean enabled) {
        this.webSettings.setJavaScriptEnabled(enabled);
    }

    public void setModuleViewClient(final ModuleViewClient client) {
        super.setWebViewClient(client);
    }

    public void setModuleChromeClient(final WebChromeClient client) {
        super.setWebChromeClient(client);
    }

    public void setUserAgentString(String userAgent) {
        this.webSettings.setUserAgentString(userAgent);
    }

    public void setAllowFileAccess(boolean enabled) {
        this.webSettings.setAllowFileAccess(enabled);
    }

    public void setAllowContentAccess(boolean enabled) {
        this.webSettings.setAllowContentAccess(enabled);
    }

    public void setAllowFileAccessFromFileURLs(boolean enabled) {
        this.webSettings.setAllowFileAccessFromFileURLs(enabled);
    }

    public void setAllowUniversalAccessFromFileURLs(boolean enabled) {
        this.webSettings.setAllowUniversalAccessFromFileURLs(enabled);
    }

    public void setDomStorageEnabled(boolean enabled) {
        this.webSettings.setDomStorageEnabled(enabled);
    }

    public void setDatabaseEnabled(boolean enabled) {
        this.webSettings.setDatabaseEnabled(enabled);
    }

    public void loadHTML(String htmlString) {
        this.loadData(htmlString, "text/html", "UTF-8");
    }

    public void loadHTML(String baseUrl, String htmlString) {
        this.loadDataWithBaseURL(baseUrl, htmlString, "text/html",
                "utf-8", null);
    }

    @Override
    public void loadUrl(String url, Map<String, String> additionalHttpHeaders) {
        throw new RuntimeException("Stub!");
    }

    @Override
    public void loadUrl(@NonNull String url) {
        super.loadUrl(url);
    }

    @Override
    public void postUrl(@NonNull String url, @NonNull byte[] postData) {
        throw new RuntimeException("Stub!");
    }

    @Override
    public void evaluateJavascript(@NonNull String script, @Nullable ValueCallback<String> resultCallback) {
        super.evaluateJavascript(script, resultCallback);
    }

    public void eventDispatcher(@NonNull String event) {
        super.evaluateJavascript(
                "(function() { window.dispatchEvent(" + event + "); })();"
                , null);
    }

    public void loadJavascript(String javascript) {
        super.evaluateJavascript(javascript, s -> {
            JsonReader reader = new JsonReader(new StringReader(s));

            // Must set lenient to parse single values
            reader.setLenient(true);

            try {
                if (reader.peek() != JsonToken.NULL) {
                    if (reader.peek() == JsonToken.STRING) {
                        String msg = reader.nextString();
                        if (msg != null) {
                            Toast.makeText(this.ctx.getApplicationContext(),
                                    msg, Toast.LENGTH_LONG).show();
                        }
                    }
                }
            } catch (IOException e) {
                Log.e("TAG", "MainActivity: IOException", e);
            } finally {
                try {
                    reader.close();
                } catch (IOException e) {
                    // NOOP
                }
            }
        });
    }

    public void loadJavascript(InputStream s) {
        try {
            byte[] b = new byte[s.available()];
            this.loadJavascript(new String(b));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
