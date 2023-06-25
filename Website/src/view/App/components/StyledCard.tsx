import { Paper, PaperProps, styled } from "@mui/material";
import { colors, useSettings } from "../../../hooks/useSettings";
import shadeColor from "../../../util/shadeColor";

export const StyledCard = (props: PaperProps): JSX.Element => {
  const { settings } = useSettings();

  const C = styled(Paper)(({ theme }) => ({
    margin: "8px 0px 0px",
    "&.MuiPaper-root": {
      borderRadius: theme.shape.borderRadius,
      color: "rgb(26, 32, 39)",
      backgroundImage: "none",
      overflow: "hidden",
      backgroundColor: settings.darkmode
        ? shadeColor(colors[settings.accent_scheme.value][900], -70)
        : "rgb(255, 255, 255)",
      border: `1px solid ${theme.palette.divider}`,
      transform: "translate(0px, -8px)",
    },
  }));

  return <C {...props} />;
};
