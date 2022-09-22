package com.dergoogler.core;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.webkit.JavascriptInterface;

import androidx.core.app.ActivityCompat;

public class NativeEnvironment {

    private final Context ctx;

    public NativeEnvironment(Context ctx) {
        this.ctx = ctx;
    }

    @JavascriptInterface
    public boolean hasPermission(String req) {
        return ActivityCompat.checkSelfPermission(ctx, req) == PackageManager.PERMISSION_GRANTED;
    }

    @JavascriptInterface
    public void requestPermission(String req) {
        ActivityCompat.requestPermissions((Activity) ctx, new String[]{req}, 1);

//        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
//            Intent intent = new Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
//            Uri uri = Uri.fromParts("package", this.ctx.getPackageName(), null);
//            intent.setData(uri);
//            this.ctx.startActivity(intent);
//        } else {
//            ((Activity) this.ctx).requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1000);
//        }
    }

}
