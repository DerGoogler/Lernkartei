package com.dergoogler.core;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.webkit.JavascriptInterface;

public class NativeEnvironment {

    private final Context ctx;

    public NativeEnvironment(Context ctx) {
        this.ctx = ctx;
    }

    @JavascriptInterface
    public boolean hasStoragePermission() {
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return Environment.isExternalStorageManager();
        } else {
            return this.ctx.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED;
        }
    }

    @JavascriptInterface
    public void requestStoargePermission() {
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            Uri uri = Uri.fromParts("package", this.ctx.getPackageName(), null);
            intent.setData(uri);
            this.ctx.startActivity(intent);
        } else {
            ((Activity) this.ctx).requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1000);
        }
    }

}
