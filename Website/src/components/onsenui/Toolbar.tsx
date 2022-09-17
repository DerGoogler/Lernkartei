import { styled } from "@mui/material";
import { Toolbar as UnstyledToolbar } from "react-onsenui";

export const Toolbar = styled(UnstyledToolbar)(({ theme }) => ({
  "& .toolbar--material": {
    backgroundColor: "blue",
  },
}));
