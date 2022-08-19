import { TextField } from "@mui/material";
import * as React from "react";
import TextareaMarkdown, { Command, CommandHandler, TextareaMarkdownRef } from "textarea-markdown-editor";

interface Props {
  style?: React.CSSProperties;
  label?: string;
}

interface State {
  description: string;
}

const customTextareaCommands = (): Command[] => {
  const checkmarkCommandHandler: CommandHandler = ({ cursor }) => {
    // MARKER - means a cursor position, or a selection range if specified two markers
    cursor.insert(`${cursor.MARKER}<checkmark/>${cursor.MARKER}`);
  };
  const dangermarkCommandHandler: CommandHandler = ({ cursor }) => {
    // MARKER - means a cursor position, or a selection range if specified two markers
    cursor.insert(`${cursor.MARKER}<dangermark/>${cursor.MARKER}`);
  };
  const warnmarkCommandHandler: CommandHandler = ({ cursor }) => {
    // MARKER - means a cursor position, or a selection range if specified two markers
    cursor.insert(`${cursor.MARKER}<warnmark/>${cursor.MARKER}`);
  };
  return [
    {
      name: "insert-checkmark",
      handler: checkmarkCommandHandler,
    },
    {
      name: "insert-dangermark",
      handler: dangermarkCommandHandler,
    },
    {
      name: "insert-warnmark",
      handler: warnmarkCommandHandler,
    },
  ];
};

class DescriptionTextField extends React.Component<Props, State> {
  private markdownRef: React.RefObject<TextareaMarkdownRef>;
  public constructor(props: Props) {
    super(props);

    this.state = {
      description: "",
    };

    this.markdownRef = React.createRef<TextareaMarkdownRef>();
  }

  private handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ description: e.target.value });
  }

  public render(): React.ReactNode {
    const { style, label } = this.props;
    const { description } = this.state;

    return (
      <TextareaMarkdown.Wrapper ref={this.markdownRef} commands={customTextareaCommands()}>
        <TextField
          style={style}
          fullWidth
          margin="dense"
          type="text"
          label={label}
          value={description}
          variant="outlined"
          multiline
          rows={4}
          inputProps={{
            style: {
              height: "100%",
            },
          }}
          onChange={this.handleDescriptionChange}
        />
      </TextareaMarkdown.Wrapper>
    );
  }
}

export { DescriptionTextField };
