import { ContentCopy, OpenInNewRounded } from "@mui/icons-material";
import { Box, Dialog, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { util } from "googlers-tools";
import React from "react";
import webview from "../../native/WebView";

type Props = JSX.IntrinsicElements["img"] & {
  shadow?: string;
};

function Image(props: Props) {
  const { src, shadow, ...rest } = props;

  const StyledImage = styled("img")(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[util.typeCheck<any>(shadow, "0")],
  }));

  return <StyledImage src={src} {...rest} />;
}
export default Image;
