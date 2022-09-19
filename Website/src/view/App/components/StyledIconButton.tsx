import { IconButton, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  display: "inline-flex",
  MozBoxAlign: "center",
  alignItems: "center",
  MozBoxPack: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: "currentcolor none 0px",
  margin: "0px",
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  appearance: "none",
  textDecoration: "none",
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: "1.5rem",
  padding: "8px",
  overflow: "visible",
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  border: "1px solid rgb(238, 238, 238)",
  borderTopColor: "rgb(238, 238, 238)",
  borderRightColor: "rgb(238, 238, 238)",
  borderBottomColor: "rgb(238, 238, 238)",
  borderLeftColor: "rgb(238, 238, 238)",
  color: "rgb(66, 66, 66)",
  borderRadius: theme.shape.borderRadius,
  alignSelf: "flex-start",
  ":hover": {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));