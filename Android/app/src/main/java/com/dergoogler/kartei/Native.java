package com.dergoogler.kartei;

public class Native {
    static {
        System.loadLibrary("strings");
    }

    public static String getGlobalColor = GLOBAL_COLOR();
    public static String getUserAgent = USER_AGENT();
    public static String getBaseURL = BASE_URL();
    public static String getNosString = NOS();
    public static String getSharedPrefString = NSHAREDPREF();
    public static String getPrefKey = PREFKEY();
    public static String getPage = PAGE();


    private native static String GLOBAL_COLOR();

    private native static String USER_AGENT();

    private native static String BASE_URL();

    private native static String NOS();

    private native static String NSHAREDPREF();


    private native static String PREFKEY();

    private native static String PAGE();

}
