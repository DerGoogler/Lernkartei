import { Paper, styled } from "@mui/material";

export const StyledCard = styled(Paper)(({ theme }) => ({
  margin: "8px 0px 0px",
  "&.MuiPaper-root": {
    borderRadius: theme.shape.borderRadius,

    color: "rgb(26, 32, 39)",
    // transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    // borderRadius: 10,
    backgroundImage: "none",
    overflow: "hidden",
    backgroundColor: "rgb(255, 255, 255)",
    border: `1px solid ${theme.palette.secondary.main}`,
    transform: "translate(0px, -8px)",
    // boxShadow: "0 1px 5.5px rgba(61, 71, 82, 0.2)",
  },
}));
