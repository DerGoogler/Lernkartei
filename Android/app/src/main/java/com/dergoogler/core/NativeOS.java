package com.dergoogler.core;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.core.content.ContextCompat;


public class NativeOS {
    private static final String TAG = "WebViewOS";
    private final Context ctx;

    public NativeOS(Context ctx) {
        this.ctx = ctx;
    }

    @JavascriptInterface
    public void makeToast(String content, int duration) {
        Toast.makeText(this.ctx, content, duration).show();
    }

    @JavascriptInterface
    public boolean isTablet() {
        boolean isTablet = false;
        Display display = ((Activity) ctx).getWindowManager().getDefaultDisplay();
        DisplayMetrics metrics = new DisplayMetrics();
        display.getMetrics(metrics);

        float widthInches = metrics.widthPixels / metrics.xdpi;
        float heightInches = metrics.heightPixels / metrics.ydpi;
        double diagonalInches = Math.sqrt(Math.pow(widthInches, 2) + Math.pow(heightInches, 2));
        if (diagonalInches >= 7.0) {
            isTablet = true;
        }

        return isTablet;
    }

    @JavascriptInterface
    public void open(String link, String color) {
        Uri uriUrl = Uri.parse(link);
        CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
        CustomTabColorSchemeParams params = new CustomTabColorSchemeParams.Builder()
                .setToolbarColor(Color.parseColor(color))
                .build();
        intentBuilder.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, params);
        CustomTabsIntent customTabsIntent = intentBuilder.build();

        // It's not the best, but it should work
        try {
            customTabsIntent.launchUrl(this.ctx, uriUrl);
        } catch (ActivityNotFoundException e) {
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(link));
            this.ctx.startActivity(intent);
        }
    }

    @JavascriptInterface
    public void close() {
        ((Activity) this.ctx).finishAffinity();
        int pid = android.os.Process.myPid();
        android.os.Process.killProcess(pid);
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        this.ctx.startActivity(intent);
    }

    @JavascriptInterface
    public int androidSdk() {
        return Build.VERSION.SDK_INT;
    }

    private static int manipulateColor(int color, float factor) {
        int a = Color.alpha(color);
        int r = Math.round(Color.red(color) * (100 + factor) / 100);
        int g = Math.round(Color.green(color) * (100 + factor) / 100);
        int b = Math.round(Color.blue(color) * (100 + factor) / 100);
        return Color.argb(a,
                Math.min(r,255),
                Math.min(g,255),
                Math.min(b,255));
    }

    @JavascriptInterface
    public String getMonetColor(String id) {
        @SuppressLint("DiscouragedApi") int nameResourceID = this.ctx.getResources().getIdentifier("@android:color/" + id,
                "color", this.ctx.getApplicationInfo().packageName);
        if (nameResourceID == 0) {
            throw new IllegalArgumentException(
                    "No resource string found with name " + id);
        } else {
            return String.format("#%06x", manipulateColor(ContextCompat.getColor(this.ctx, nameResourceID) & 0xffffff, 75));
        }
    }

    @JavascriptInterface
    public void setStatusBarColor(String color, boolean white) {
        if (white) {
            try {
                ((Activity) this.ctx).getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        try {
            ((Activity) this.ctx).getWindow().setStatusBarColor(Color.parseColor(color));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public void setNavigationBarColor(String color) {
        try {
            ((Activity) this.ctx).getWindow().setNavigationBarColor(Color.parseColor(color));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
