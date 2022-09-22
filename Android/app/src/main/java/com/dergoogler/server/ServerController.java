package com.dergoogler.server;

import android.content.Context;

import com.dergoogler.core.NativeSharedPreferences;
import com.dergoogler.kartei.MainActivity;
import com.yanzhenjie.andserver.annotation.Controller;
import com.yanzhenjie.andserver.annotation.GetMapping;
import com.yanzhenjie.andserver.annotation.ResponseBody;
import com.yanzhenjie.andserver.framework.body.JsonBody;
import com.yanzhenjie.andserver.framework.body.StringBody;
import com.yanzhenjie.andserver.http.HttpResponse;
import com.yanzhenjie.andserver.http.RequestBody;
import com.yanzhenjie.andserver.util.MediaType;

import org.apache.commons.io.Charsets;
import org.json.JSONObject;

@Controller
public class ServerController {
    @GetMapping(path = "/")
    public String index() {
        // Equivalent to [return "/index"].
        return "forward:/index.html";
    }

    @GetMapping(path = "/cards.json")
    @ResponseBody
    public JsonBody cards() {
        String json = new NativeSharedPreferences(MainActivity.getAppContext()).getString("katei", "[]");
        return new JsonBody(json);
    }
}
