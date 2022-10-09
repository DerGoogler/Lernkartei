import { os } from "@Native/Os";
import React from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

namespace UI {
  export type StatusbarProps = {
    children: React.ReactNode;
    color: string;
    white: boolean;
  };
  export type NavigationbarProps = {
    children: React.ReactNode;
    color: string;
  };
}

export const UI = {
  Statusbar: (props: UI.StatusbarProps) => {
    useIsomorphicLayoutEffect(() => {
      os.setStatusBarColor(props.color, props.white);
    }, [props.color, props.white]);

    return <React.Fragment>{props.children}</React.Fragment>;
  },
  Navigationbar: (props: UI.NavigationbarProps) => {
    useIsomorphicLayoutEffect(() => {
      os.setNavigationBarColor(props.color);
    }, [props.color]);

    return <React.Fragment>{props.children}</React.Fragment>;
  },
};
