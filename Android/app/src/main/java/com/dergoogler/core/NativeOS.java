package com.dergoogler.core;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
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
    public String getMonetColor(String id) {
        int nameResourceID = this.ctx.getResources().getIdentifier("@android:color/" + id,
                "color", this.ctx.getApplicationInfo().packageName);
        if (nameResourceID == 0) {
            throw new IllegalArgumentException(
                    "No resource string found with name " + id);
        } else {
            int color = ContextCompat.getColor(this.ctx, nameResourceID);
            int red = Color.red(color);
            int blue = Color.blue(color);
            int green = Color.green(color);
            return String.format("#%02x%02x%02x", red, green, blue);
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
