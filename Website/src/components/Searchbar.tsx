import * as React from "react";
import { SearchRounded } from "@mui/icons-material";
import { Button, SearchInput } from "react-onsenui";
import { styled, useTheme } from "@mui/material";
import { colors, default_scheme, isDarkmode } from "../theme";
import shadeColor from "../util/shadeColor";

type SearchbarProps = {
  onSearchClick: (value: string) => void;
  placeholder: string;
};

const StyledButton = styled(Button)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  "& > div": {
    textAlign: "center",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StyledSearchInput = styled(SearchInput)(({ theme }) => ({
  width: "100%",
  borderRight: "none",
  "& .search-input--material": {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: `${theme.shape.borderRadius}px 0px 0px ${theme.shape.borderRadius}px`,
    backgroundColor: isDarkmode ? shadeColor(colors[default_scheme.value][900], -70) : "rgb(255, 255, 255)",
  },
}));

export const Searchbar = ({ placeholder, onSearchClick }: SearchbarProps) => {
  const theme = useTheme();

  const [value, setVaule] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVaule(event.target.value);
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "inline-flex",
        justifyContent: "center",
        padding: "0px 0px 8px",
        width: "100%",
      }}
    >
      <StyledSearchInput
        placeholder={placeholder}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter") {
            onSearchClick(value);
          }
        }}
        // @ts-ignore
        onChange={handleChange}
      />
      <StyledButton
        style={{
          borderRadius: `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
        }}
        // @ts-ignore
        onClick={() => {
          onSearchClick(value);
        }}
      >
        <div>
          <SearchRounded sx={{ color: "white" }} />
        </div>
      </StyledButton>
    </div>
  );
};
