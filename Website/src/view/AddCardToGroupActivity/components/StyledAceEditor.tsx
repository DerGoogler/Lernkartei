import { styled } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-json";
import { useSettings } from "@Hooks/useSettings";
import React from "react";

type EditorProps = {
  mode: "json" | "markdown";
  value: string;
  placeholder: string;
  onChange?: (value: string, event?: any) => void;
};

const StyledAceEditor = styled("div")(({ theme }) => ({
  height: "100%",
  flex: 1,
  width: "100%",
  minHeight: "100%",
  position: "relative",
  "& .ace_editor": {
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

export const Editor = React.forwardRef<AceEditor, EditorProps>((props, ref) => {
  const { settings } = useSettings();

  return (
    <>
      <StyledAceEditor>
        <AceEditor
          ref={ref}
          mode={props.mode}
          width="100%"
          height="100%"
          fontSize="inherit"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          showGutter={settings.__ace_settings_show_gutter}
          highlightActiveLine={settings.__ace_settings_highlight_active_line}
          enableBasicAutocompletion={false}
          enableLiveAutocompletion={false}
          enableSnippets={false}
          setOptions={{
            showLineNumbers: settings.__ace_settings_show_line_numbers,
          }}
        />
      </StyledAceEditor>
    </>
  );
});
