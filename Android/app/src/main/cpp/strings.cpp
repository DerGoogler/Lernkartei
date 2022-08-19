#include <jni.h>
#include <string>
#include <cstdlib>
#include <iostream>
#include <stdexcept>
#include <cstdio>
#include <sstream>

using namespace std;

void addToStream(ostringstream &) {
}

template<typename T, typename... Args>
void addToStream(ostringstream &a_stream, T &&a_value, Args &&... a_args) {
    a_stream << forward<T>(a_value);
    addToStream(a_stream, forward<Args>(a_args)...);
}

template<typename... Args>
string concat(Args &&... a_args) {
    ostringstream s;
    addToStream(s, forward<Args>(a_args)...);
    return s.str();
}

string ConvertJString(JNIEnv *env, jstring str) {
    if (!str) string();
    const jsize len = env->GetStringUTFLength(str);
    const char *strChars = env->GetStringUTFChars(str, (jboolean *) 0);
    string Result(strChars, len);
    env->ReleaseStringUTFChars(str, strChars);
    return Result;
}


extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_kartei_Native_GLOBAL_1COLOR(JNIEnv *env, jclass clazz) {
    string data = "#4a148c";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_kartei_Native_USER_1AGENT(JNIEnv *env, jclass clazz) {
    string data = "KARTEI";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_kartei_Native_BASE_1URL(JNIEnv *env, jclass clazz) {
    string data = "file:///android_asset/";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_kartei_Native_NOS(JNIEnv *env, jclass clazz) {
    string data = "nos";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_kartei_Native_NSHAREDPREF(JNIEnv *env, jclass clazz) {
    string data = "nsharedpreferences";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_kartei_Native_PREFKEY(JNIEnv *env, jclass clazz) {
    string data = "localstorage";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_kartei_Native_PAGE(JNIEnv *env, jclass clazz) {
    string data01 = R"(<!DOCTYPE html>)";
    string data02 = R"(<html>)";
    string data03 = R"(<head>)";
    string data04 = R"(<link rel="stylesheet" type="text/css" href="bundle/vendor.bundle.css"/>)";
    string data05 = R"(<link rel="stylesheet" type="text/css" href="bundle/app.bundle.css"/>)";
    string data06 = R"(<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>)";
    string data07 = R"(<meta charset="utf-8" />)";
    string data08 = R"(</head>)";
    string data09 = R"(<body>)";
    string data10 = R"(<script src="bundle/vendor.bundle.js"></script>)";
    string data11 = R"(<script src="bundle/app.bundle.js"></script>)";
    string data12 = R"(</body>)";
    string data13 = R"(</html>)";
    string result = data01 + data02 + data03 + data04 + data05 + data06 + data07 + data08 + data09 +
                    data10 + data11 + data12 + data13;

    return env->NewStringUTF(result.c_str());
}