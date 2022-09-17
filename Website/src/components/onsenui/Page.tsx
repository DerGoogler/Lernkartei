import styled from "@emotion/styled";
import { Page as UnstyledPage } from "react-onsenui";

export const Page = styled(UnstyledPage)(({ theme }) => ({
  ":root": {
    "--page-background-color": "var(--background-color)",
    "--page-material-background-color": "var(--material-background-color)",
  },
  ".page": {
    fontFamily: "-apple-system, 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', sans-serif",
    MozOsxFontSmoothing: "grayscale",
    fontWeight: "var(--font-weight)",
    backgroundColor: "var(--page-background-color)",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    overflowX: "visible",
    overflowY: "hidden",
    color: "var(--text-color)",
    msOverflowStyle: "none",
    WebkitFontSmoothing: "antialiased",
  },
  ".page::-webkit-scrollbar": { display: "none" },
  ".page__content": {
    backgroundColor: "var(--page-background-color)",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    boxSizing: "border-box",
  },
  ".page__background": {
    backgroundColor: "var(--page-background-color)",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    boxSizing: "border-box",
  },
  ".page--material": {
    fontFamily: "'Roboto', 'Noto', sans-serif",
    WebkitFontSmoothing: "antialiased",
    fontWeight: "var(--material-font-weight)",
    backgroundColor: "var(--page-material-background-color)",
  },
  ".page--material__content": {
    fontFamily: "'Roboto', 'Noto', sans-serif",
    WebkitFontSmoothing: "antialiased",
    fontWeight: "var(--font-weight)",
  },
  ".page__content h1,\n.page__content h2,\n.page__content h3,\n.page__content h4,\n.page__content h5": {
    fontFamily: "'Roboto', 'Noto', sans-serif",
    WebkitFontSmoothing: "antialiased",
    fontWeight: "var(--font-weight--large)",
    margin: "0.6em 0",
    padding: "0",
  },
  ".page__content h1": { fontSize: "28px" },
  ".page__content h2": { fontSize: "24px" },
  ".page__content h3": { fontSize: "20px" },
  ".page--material__content h1,\n.page--material__content h2,\n.page--material__content h3,\n.page--material__content h4,\n.page--material__content h5":
    {
      fontFamily: "'Roboto', 'Noto', sans-serif",
      WebkitFontSmoothing: "antialiased",
      fontWeight: "var(--font-weight--large)",
      margin: "0.6em 0",
      padding: "0",
    },
  ".page--material__content h1": { fontSize: "28px" },
  ".page--material__content h2": { fontSize: "24px" },
  ".page--material__content h3": { fontSize: "20px" },
  ".page--material__background": {
    backgroundColor: "var(--page-material-background-color)",
  },
}));
