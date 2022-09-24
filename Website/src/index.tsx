import React from "react";
import ons from "onsenui";
import { Core } from "./Core";
import { dom, rct } from "googlers-tools";

// Styles
import "onsenui/css/onsenui.css";
import "./styles/default.scss";

dom.preventer(["contextmenu"]);
ons.platform.select("android");

ons.ready(() => {
  rct.render(
    <React.StrictMode>
      <Core />
    </React.StrictMode>,
    "app"
  );
});
