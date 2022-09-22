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
import com.yanzhenjie.andserver.AndServer;
import com.yanzhenjie.andserver.Server;

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
    private Server server;
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

        WifiManager wifiMgr = (WifiManager) getSystemService(WIFI_SERVICE);
        WifiInfo wifiInfo = wifiMgr.getConnectionInfo();
        int ip = wifiInfo.getIpAddress();
        String ipAddress = Formatter.formatIpAddress(ip);

        server = AndServer.webServer(this)
                .port(6969)
                .timeout(10, TimeUnit.SECONDS)
                .build();
        server.startup();

        Log.wtf(TAG, getIPAddress(true) + ":6969");
        // Content
        String baseUrl = "http://" + getIPAddress(true) + ":6969";
        view.loadHTML(baseUrl, pageContent(baseUrl));


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


    /**
     * Get IP address from first non-localhost interface
     *
     * @param useIPv4 true=return ipv4, false=return ipv6
     * @return address or empty string
     */
    public String getIPAddress(boolean useIPv4) {
        try {
            List<NetworkInterface> interfaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                List<InetAddress> addrs = Collections.list(intf.getInetAddresses());
                for (InetAddress addr : addrs) {
                    if (!addr.isLoopbackAddress()) {
                        String sAddr = addr.getHostAddress();
                        //boolean isIPv4 = InetAddressUtils.isIPv4Address(sAddr);
                        boolean isIPv4 = sAddr.indexOf(':') < 0;

                        if (useIPv4) {
                            if (isIPv4)
                                return sAddr;
                        } else {
                            if (!isIPv4) {
                                int delim = sAddr.indexOf('%'); // drop ip6 zone suffix
                                return delim < 0 ? sAddr.toUpperCase() : sAddr.substring(0, delim).toUpperCase();
                            }
                        }
                    }
                }
            }
        } catch (Exception ignored) {
        } // for now eat exceptions
        return "";
    }

    public String pageContent(String baseUrl) {
        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "  <head>\n" +
                "    <meta charset=\"utf-8\" />\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
                "    <link rel=\"stylesheet\" type=\"text/css\" href=\"" + baseUrl + "/bundle/vendor.bundle.css\" />\n" +
                "    <link rel=\"stylesheet\" type=\"text/css\" href=\"" + baseUrl + " /bundle/app.bundle.css\" />\n" +
                "    <link\n" +
                "      rel=\"stylesheet\"\n" +
                "      type=\"text/css\"\n" +
                "      href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"\n" +
                "    />\n" +
                "  </head>\n" +
                "  <body>\n" +
                "    <script\n" +
                "      type=\"application/javascript\"\n" +
                "      src=\"" + baseUrl + "/bundle/vendor.bundle.js\"\n" +
                "    ></script>\n" +
                "    <script type=\"application/javascript\" src=\"" + baseUrl + "/bundle/app.bundle.js\"></script>\n" +
                "  </body>\n" +
                "</html>\n";
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        server.shutdown();
    }

    @Override
    public void onBackPressed() {
        view.eventDispatcher("onbackbutton");
    }

    public static Context getAppContext() {
        return mContext;
    }
}
