import { styled } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-json";

type EditorProps = {
  mode: "json" | "markdown";
  value: string;
  placeholder: string;
  onChange?: (value: string, event?: any) => void;
};

export const Editor = (props: EditorProps) => {
  const StyledAceEditor = styled("div")(({ theme }) => ({
    height: "100%",
    flex: 1,
    width: "100%",
    minHeight: "100%",
    position: "relative",
    "& .ace_editor": {
      // font: "inherit",
      // fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      // letterSpacing: "inherit",
      borderRadius: theme.shape.borderRadius,
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "& .ace-tm": {
      backgroundColor: theme.palette.background.default,
      "& .ace_gutter": {
        backgroundColor: theme.palette.divider,
      },
    },
  }));

  return (
    <>
      <StyledAceEditor>
        <AceEditor
          mode={props.mode}
          width="100%"
          height="100%"
          fontSize="inherit"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{}}
        />
      </StyledAceEditor>
    </>
  );
};
