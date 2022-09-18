- Big design changes
- Fix groups link/cdn
- Fixed many links
- Added color themes
- Added back dark mode
- Bump Dependencies
- Added confirm dialog before exiting the editing process
- Native interface reworkings
- Added backup for cards (beta)



import * as React from "react";
import Box from "@mui/material/Box";
import ExtensionIcon from "@mui/icons-material/Extension";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  color: "rgb(255, 255, 255)",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  borderRadius: "10px",
  background: `rgba(0, 0, 0, 0) linear-gradient(to right bottom, ${theme.palette.secondary.main}, ${theme.palette.primary.main} 120%) repeat scroll 0% 0%`,
  // boxShadow:
  // "rgba(0, 0, 0, 0.1) 0px 20px 25px, rgba(0, 0, 0, 0.04) 0px 10px 10px",
  overflow: "hidden",
  // minWidth: "280px",
  // maxWidth: "360px",
  // minHeight: "280px",
  display: "flex",
  flexDirection: "column"
  // padding: "16px"
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  MozBoxAlign: "center",
  alignItems: "center",
  MozBoxPack: "center",
  justifyContent: "center",
  background: "rgba(0, 0, 0, 0.1)",
  flexShrink: "0",
  fontFamily:
    '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: "1.25rem",
  lineHeight: "1",
  borderRadius: "10px",
  overflow: "hidden",
  userSelect: "none",
  width: "60px",
  height: "60px"
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginLeft: "20px",
  marginRight: "20px",
  MozBoxFlex: "1",
  flexGrow: "1"
}));

export default function SvgMaterialIcons() {
  return (
    <StyledPaper elevation={0}>
      <Box sx={{ p: 2, display: "flex" }}>
        <StyledAvatar>
          12
          {/* <ExtensionIcon sx={{ fontSize: 30 }} /> */}
        </StyledAvatar>
        <StyledStack spacing={0.5}>
          <Typography fontWeight={700}>dfhgfghfgh</Typography>
          <Typography variant="body2">sdfhhjklhsdkhjsdkf</Typography>
        </StyledStack>
        <IconButton>
          <Edit sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1 }}
      >
        <Chip sx={{ color: "rgba(0, 0, 0, 0.5)" }} label="Karten"></Chip>
      </Stack>
    </StyledPaper>
  );
}
