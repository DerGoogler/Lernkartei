import * as React from "react";
import { SearchRounded } from "@mui/icons-material";
import { Button, SearchInput } from "react-onsenui";
type SearchbarProps = {
  onSearchClick: (value: string) => void;
  placeholder: string;
};

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
      <SearchInput
        placeholder={placeholder}
        style={{
          borderRadius: "8px",
          width: "100%",
          marginRight: "4px",
        }}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter") {
            onSearchClick(value);
          }
        }}
        // @ts-ignore
        onChange={handleChange}
      />
      <Button
        // @ts-ignore
        onClick={() => {
          onSearchClick(value);
        }}
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          marginLeft: "4px",
          borderRadius: "8px",
          boxShadow: "none",
        }}
      >
        <div
          style={{
            textAlign: "center",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchRounded sx={{ color: "white" }} />
        </div>
      </Button>
    </div>
  );
};
