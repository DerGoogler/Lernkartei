import Markdown from "markdown-to-jsx";
import Anchor from "../dapi/Anchor";
import Video from "../dapi/Video";
import Audio from "../dapi/Audio";
import Checkmark from "../icons/Checkmark";
import Dangermark from "../icons/Dangermark";
import Warnmark from "../icons/Warnmark";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import React from "react";
import Image from "../dapi/Image";
import { Alert, Box, Chip, Container, Divider, Grid, Paper, Stack } from "@mui/material";
import { StyledMarkdown } from "./StyledMarkdon";
import styled from "@emotion/styled";
import { parser } from "./parser";
import { useMdPlugin } from "../../plugin/kplugin";

type Props = {
  children: string;
  style?: React.CSSProperties;
  styleMd?: React.CSSProperties;
};

export function Markup(props: Props) {
  const [mdPlugins, setMdPlugins] = useMdPlugin();

  const StyledDivider = styled(Divider)({
    "h1, & h2, & h3, & h4, & h5, & h6": {
      border: "none",
    },
    "& .MuiDivider-fullWidth": {
      "& .MuiDivider-root::before, & .MuiDivider-root::after": {
        borderTop: "1px solid hsl(210, 18.2%, 87.1%)",
      },
    },
  });

  const StyledAlert = styled(Alert)((props) => ({
    marginTop: 4,
    marginBottom: 4,
  }));

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
        children={parser(props.children, mdPlugins)}
      />
    </StyledMarkdown>
  );
}
