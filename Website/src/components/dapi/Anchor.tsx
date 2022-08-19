import { ContentCopy, OpenInNewRounded } from "@mui/icons-material";
import { Dialog, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import React from "react";
import webview from "../../native/WebView";

function Anchor(props: JSX.IntrinsicElements["a"]) {
  const { href, children, ...rest } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const StyledAnchor = styled("div")(({ theme }) => ({
    display: "inline-block",
    "& div[href]": {
      cursor: "pointer",
      color: theme.palette.primary.main,
      "& abbr[title]": {
        textDecoration: "none",
        cursor: "pointer",
      },
      ":hover": {
        textDecoration: "underline",
      },
    },
  }));

  return (
    <StyledAnchor>
      <div
        href={href}
        // @ts-ignore
        onClick={() => {
          href ? webview.open(href, "_blank") : null;
        }}
        {...rest}
      >
        {/* @ts-ignore */}
        <abbr title={href}>{children}</abbr>
      </div>
    </StyledAnchor>
  );
}

export default Anchor;
