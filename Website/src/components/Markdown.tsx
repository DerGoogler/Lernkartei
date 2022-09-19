import Markdown from "markdown-to-jsx";
import Anchor from "../components/dapi/Anchor";
import Video from "../components/dapi/Video";
import Audio from "../components/dapi/Audio";
import Checkmark from "../components/icons/Checkmark";
import Dangermark from "../components/icons/Dangermark";
import Warnmark from "../components/icons/Warnmark";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import React from "react";
import Image from "./dapi/Image";
import { Box, Chip, Container, Divider, Grid, Paper, Stack } from "@mui/material";
import { StyledMarkdown } from "../styles/StyledMarkdon";
import styled from "@emotion/styled";

type Props = {
  children: string;
  style?: React.CSSProperties;
  styleMd?: React.CSSProperties;
};

export function Markup(props: Props) {
  const StyledDivider = styled(Divider)({
    "h1, & h2, & h3, & h4, & h5, & h6": {
      border: "none",
    },
  });

  return (
    <StyledMarkdown style={{ display: "inline-block", padding: "8px", height: "100%", width: "100%", ...props.style }}>
      <Markdown
        style={props.styleMd}
        options={{
          overrides: {
            a: {
              component: Anchor,
            },
            img: {
              component: Image,
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
}
