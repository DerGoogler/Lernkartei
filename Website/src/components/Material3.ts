import { styled } from "@mui/material";
import { Button, Fab, Switch } from "react-onsenui";

const Material3 = {
  Switch: styled(Switch)(({ theme }) => ({
    "& .switch--material": {
      width: "36px",
      height: "24px",
      padding: "0 10px",
      minWidth: "36px",
    },
    "& .switch--material__input": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      verticalAlign: "top",
      outline: "none",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      appearance: "none",
      zIndex: "0",
    },
    "& :checked + .switch--material__toggle": {
      boxShadow: "none",
      backgroundColor: theme.palette.primary.main,
    },
    "& .switch--material__toggle": {
      backgroundColor: "#b0afaf",
      marginTop: "2px",
      height: "20px",
      boxShadow: "none",
    },
    "& .switch--material__handle": {
      backgroundColor: "#f1f1f1",
      left: "0",
      marginTop: "0.3px",
      width: "15px",
      height: "15px",
      boxShadow: "none",
      marginLeft: "3px",
    },
    "& :checked + .switch--material__toggle > .switch--material__handle": {
      left: "15px",
      backgroundColor: "#ffffff",
      boxShadow: "none",
    },
  })),
  Fab: styled(Fab)(({ theme }) => ({
    "& ons-fab.fab--material, & ons-speed-dial-item.fab--material, & button.fab--material": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "rgba(255, 255, 255, 1)",
      background: "transparent",
      border: "0 solid currentColor",
      lineHeight: "56px",
      fontFamily: '"Roboto", "Noto", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      width: "56px",
      height: "56px",
      textDecoration: "none",
      fontSize: "25px",
      letterSpacing: "0",
      verticalAlign: "middle",
      textAlign: "center",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "20%",
      overflow: "hidden",
      boxShadow:
        "0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),\r\n    0 2px 4px -1px rgba(0, 0, 0, 0.4)",
      transition: "all 0.2s ease-in-out",
    },
    "& ons-fab.fab--material:active, & ons-speed-dial-item.fab--material:active, & button.fab--material:active": {
      boxShadow:
        "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12),\r\n    0 5px 5px -3px rgba(0, 0, 0, 0.4)",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      transition: "all 0.2s ease",
    },
    "& ons-fab.fab--material:focus, & ons-speed-dial-item.fab--material:focus, & button.fab--material:focus": {
      outline: "0",
    },
    "& ons-fab.fab--material__icon, & ons-speed-dial-item.fab--material__icon, & button.fab--material__icon": {
      position: "relative",
      overflow: "hidden",
      height: "100%",
      width: "100%",
      display: "block",
      borderRadius: "20%",
      padding: "0",
      zIndex: "100",
      lineHeight: "56px",
    },
    "& ons-fab.fab--material:disabled, & ons-fab.fab--material[disabled], & ons-speed-dial-item.fab--material:disabled, & ons-speed-dial-item.fab--material[disabled], & button.fab--material:disabled, & button.fab--material[disabled]":
      {
        backgroundColor: "color-mod(black alpha(50%))",
        boxShadow: "none",
        opacity: "0.3",
        pointerEvents: "none",
      },
  })),
  Button: styled(Button)(({ theme }) => ({
    "& .button--material": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0 16px",
      margin: "0",
      font: "inherit",
      color: "#ffffff",
      background: "transparent",
      border: "0 solid currentColor",
      lineHeight: "36px",
      fontFamily: '"Roboto", "Noto", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "500",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fontSize: "14px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: theme.palette.primary.main,
      // borderRadius: "8px",
      transition: "all 0.25s linear",
      boxShadow:
        "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
      minHeight: "36px",
      textAlign: "center",
      webkitTransform: "translate3d(0, 0, 0)",
      transform: "translate3d(0, 0, 0)",
      textTransform: "uppercase",
      opacity: "1",
    },
    "& .button--material:hover": {
      transition: "all 0.25s linear",
    },
    "& .button--material:active": {
      boxShadow:
        "0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 5px -1px rgba(0, 0, 0, 0.4)",
      backgroundColor: "#4a148c",
      opacity: "0.9",
      transition: "all 0.25s linear",
    },
    "& .button--material:focus": {
      outline: "0",
    },
    "& .button--material:disabled, .button--material[disabled]": {
      transition: "none",
      boxShadow: "none",
      backgroundColor: "#330f5e",
      color: "color-mod(black a(26%))",
      opacity: "1",
    },
    "& .button--material--flat": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0 16px",
      margin: "0",
      font: "inherit",
      color: "#4a148c",
      background: "transparent",
      border: "0 solid currentColor",
      lineHeight: "36px",
      fontFamily: '"Roboto", "Noto", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "500",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fontSize: "14px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: "transparent",
      borderRadius: "3px",
      transition: "all 0.25s linear",
      boxShadow: "none",
      minHeight: "36px",
      textAlign: "center",
      webkitTransform: "translate3d(0, 0, 0)",
      transform: "translate3d(0, 0, 0)",
      textTransform: "uppercase",
    },
    "& .button--material--flat:hover": {
      transition: "all 0.25s linear",
    },
    "& .button--material--flat:focus": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
      outline: "0",
      opacity: "1",
      border: "none",
    },
    "& .button--material--flat:active": {
      boxShadow: "none",
      outline: "0",
      opacity: "1",
      border: "none",
      backgroundColor: "color-mod(#999 a(20%))",
      color: theme.palette.primary.main,
      transition: "all 0.25s linear",
    },
    "& .button--material--flat:disabled, .button--material--flat[disabled]": {
      transition: "none",
      opacity: "1",
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "color-mod(black a(26%))",
    },
  })),
};

export default Material3;
