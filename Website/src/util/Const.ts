import webview from "../native/WebView";

const Const = {
  GlobalColor: "#4a148c",
  DisappearBackgroundColor: !webview.pref.getBoolean("darkmode", false) ? "#4a148c" : "rgb(31, 31, 31)",
};

export default Const;
