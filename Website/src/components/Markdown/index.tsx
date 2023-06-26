import Markdown from "markdown-to-jsx";
import Anchor, { Open } from "../dapi/Anchor";
import Video from "../dapi/Video";
import Audio from "../dapi/Audio";
import Checkmark from "../icons/Checkmark";
import Dangermark from "../icons/Dangermark";
import Warnmark from "../icons/Warnmark";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import React from "react";
import { Image, ImageWithCaption } from "../dapi/Image";
import { Alert, Box, Chip, Container, Divider, Grid, Paper, Stack } from "@mui/material";
import { StyledMarkdown } from "./StyledMarkdon";
import styled from "@emotion/styled";

type Props = {
  children: string;
  style?: React.CSSProperties;
  styleMd?: React.CSSProperties;
};

export const Markup = React.forwardRef((props: Props, ref) => {
  const StyledDivider = styled(Divider)({
    "h1, & h2, & h3, & h4, & h5, & h6": {
      border: "none",
    },
  });

  const StyledAlert = styled(Alert)((props) => ({
    marginTop: 4,
    marginBottom: 4,
  }));

  return (
    <StyledMarkdown
      ref={ref as any}
      style={{ display: "inline-block", padding: "8px", height: "100%", width: "100%", ...props.style }}
    >
      <Markdown
        style={props.styleMd}
        options={{
          overrides: {
            a: {
              component: Anchor,
            },
            open: {
              component: Open,
            },
            img: {
              component: Image,
            },
            imgwithcap: {
              component: ImageWithCaption,
            },
            video: {
              component: Video,
            },
            divider: {
              component: StyledDivider,
            },
            grid: {
              component: Grid,
            },
            chip: {
              component: Chip,
            },
            paper: {
              component: Paper,
            },
            box: {
              component: Box,
            },
            container: {
              component: Container,
            },
            stack: {
              component: Stack,
            },
            icon: {
              component: (props: { i: string }) => {
                return <Icon {...props}>{props.i}</Icon>;
              },
            },
            typography: {
              component: Typography,
            },
            audio: {
              component: Audio,
            },
            checkmark: {
              component: Checkmark,
            },
            dangermark: {
              component: Dangermark,
            },
            warnmark: {
              component: Warnmark,
            },
          },
        }}
        children={props.children}
      />
    </StyledMarkdown>
  );
});
