import * as React from "react";
import { SearchRounded } from "@mui/icons-material";
import { Button, SearchInput } from "react-onsenui";
import { styled } from "@mui/material";

type SearchbarProps = {
  onSearchClick: (value: string) => void;
  placeholder: string;
};

const StyledButton = styled(Button)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  marginLeft: "4px",

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
  marginRight: "4px",
  "& .search-input--material": {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
  },
}));

export const Searchbar = ({ placeholder, onSearchClick }: SearchbarProps) => {
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
        padding: "8px 8px 4px",
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
