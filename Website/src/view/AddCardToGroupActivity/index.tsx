import { Stack, styled, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ons from "onsenui";
import * as React from "react";
import { Page } from "react-onsenui";
import Button from "@mui/material/Button";
import TextareaMarkdown, { Command, TextareaMarkdownRef } from "textarea-markdown-editor";
import {
  CheckRounded,
  CloseRounded,
  FormatBoldRounded,
  FormatItalicRounded,
  FormatListBulletedRounded,
  FormatListNumberedRounded,
  FormatQuoteRounded,
  FormatStrikethroughRounded,
  ImageRounded,
  LinkRounded,
  WarningAmberRounded,
  Redo,
  Undo,
} from "@mui/icons-material";
import DescriptonActivity from "../DescriptonActivity";
import { isDesktop } from "react-device-detect";
import { os } from "../../native/Os";
import { useKartei } from "../../hooks/useKartei";
import { Markup } from "../../components/Markdown";
import { useActivity } from "../../hooks/useActivity";
import { useStrings } from "../../hooks/useStrings";
import { useReactToPrint } from "react-to-print";
import { Editor } from "./components/StyledAceEditor";
import AceEditor from "react-ace";
import { useSettings } from "@Hooks/useSettings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Toolbar } from "@Components/onsenui/Toolbar";

type Extra = { card: Karten; index: number; edit: boolean; cardIndex: number; shortDesc: string; desc: string };

interface CustomCommand extends Command {
  icon: React.ElementType;
  iconStyle?: React.CSSProperties;
}

function AddCardToGroupActivity() {
  const { context, extra } = useActivity<Extra>();
  const { strings } = useStrings();
  const { cards, setCards, actions } = useKartei();

  // Settings
  const { settings } = useSettings();

  const { edit, desc, shortDesc, index, card, cardIndex } = extra;
  const [shortDescription, setShortDescription] = React.useState(edit ? shortDesc : "");
  const [description, setDescription] = React.useState(edit ? desc : "");
  const [shortDescriptionError, setShortDescriptionError] = React.useState(edit ? false : true);
  const markdownRef = React.useRef<TextareaMarkdownRef>(null);
  const markdownRefAdvanced = React.useRef<AceEditor>(null);
  const printRef = React.useRef<HTMLDivElement>(null);

  const customTextareaCommands: CustomCommand[] = React.useMemo(
    () => [
      ...(settings.__ace_settings_enabled
        ? [
            {
              name: "undo",
              icon: Undo,
              handler: ({ cursor }) => {
                markdownRefAdvanced.current?.editor.undo();
              },
            },
            {
              name: "redo",
              icon: Redo,

              handler: ({ cursor }) => {
                markdownRefAdvanced.current?.editor.redo();
              },
            },
          ]
        : []),
      {
        name: "bold",
        icon: FormatBoldRounded,
      },
      {
        name: "italic",
        icon: FormatItalicRounded,
      },
      {
        name: "strike-through",
        icon: FormatStrikethroughRounded,
      },
      {
        name: "link",
        icon: LinkRounded,
      },
      {
        name: "image",
        icon: ImageRounded,
      },
      {
        name: "unordered-list",
        icon: FormatListBulletedRounded,
      },
      {
        name: "ordered-list",
        icon: FormatListNumberedRounded,
      },
      {
        name: "block-quotes",
        icon: FormatQuoteRounded,
      },
      {
        name: "insert-checkmark",
        icon: CheckRounded,
        iconStyle: {
          color: "#1a7f37",
        },
        handler: ({ cursor }) => {
          cursor.insert(`${cursor.MARKER}<checkmark/>${cursor.MARKER}`);
        },
      },
      {
        name: "insert-warnmark",
        icon: WarningAmberRounded,
        iconStyle: {
          color: "#d29922",
        },
        handler: ({ cursor }) => {
          cursor.insert(`${cursor.MARKER}<warnmark/>${cursor.MARKER}`);
        },
      },
      {
        name: "insert-dangermark",
        icon: CloseRounded,
        iconStyle: {
          color: "#cf222e",
        },
        handler: ({ cursor }) => {
          cursor.insert(`${cursor.MARKER}<dangermark/>${cursor.MARKER}`);
        },
      },
    ],
    [settings.__ace_settings_enabled]
  );

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{edit ? strings.edit_card : strings.new_card}</Toolbar.Center>
      </Toolbar>
    );
  };

  const handleSave = () => {
    if (shortDescription != "") {
      try {
        const obj: Karten = {
          shortDescription: shortDescription,
          description: description,
        };

        actions.addKarte({
          index: index,
          data: obj,
          callback() {
            context.popPage();
            os.toast(strings.card_saved, "short");
          },
        });
      } catch (error) {
        alert((error as Error).message);
      }
    } else {
      os.toast(strings.shortDescriptionNoEmpty, "short");
    }
  };

  const handleEdit = () => {
    setCards((tmp) => {
      tmp[cardIndex].karten[index].shortDescription = shortDescription;
      tmp[cardIndex].karten[index].description = description;

      if (shortDescription === "") {
        ons.notification.alert(strings.shortDescriptionNoEmpty);
      } else {
        context.popPage();
      }
      return tmp;
    });
  };

  const handleShortDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortDescription(e.target.value);
    setShortDescriptionError(e.target.value === "");
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const reactToPrintContent = React.useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "document",
    removeAfterPrint: false,
  });

  const handlePreviewOrPrint = () => {
    if (!os.isAndroid && isDesktop) {
      handlePrint();
    } else {
      context.pushPage<any>({
        component: DescriptonActivity,
        props: {
          key: `preview_${shortDescription}`,
          extra: {
            desc: description,
            shortDesc: shortDescription,
            index: "Preview",
            cardIndex: index,
          },
        },
      });
    }
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <section style={{ padding: 8, height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <span>
          <TextField
            fullWidth
            type="text"
            label={strings.shortDescription}
            value={shortDescription}
            error={shortDescriptionError}
            helperText={shortDescriptionError ? strings.shortDescriptionNoEmpty : ""}
            variant="outlined"
            onChange={handleShortDescriptionChange}
          />
        </span>
        <ToggleButtonGroup
          size="small"
          style={{
            marginTop: 8,
            marginBottom: 4,
            overflow: "auto",
          }}
        >
          {customTextareaCommands.map((El) => (
            <ToggleButton value={El.name} key={String(El.name)} onClick={() => markdownRef.current?.trigger(El.name)}>
              {/* @ts-ignore */}
              <El.icon style={El.iconStyle} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <span style={{ flex: 1, display: "flex", marginTop: 4 }}>
          <Stack
            style={{
              height: "100%",
              width: "100%",
            }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <TextareaMarkdown.Wrapper ref={markdownRef} commands={customTextareaCommands}>
              {settings.__ace_settings_enabled ? (
                <Editor
                  ref={markdownRefAdvanced}
                  mode="markdown"
                  onChange={(val: string) => {
                    setDescription(val);
                  }}
                  value={description}
                  placeholder={""}
                />
              ) : (
                <StyledTextField
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                  }}
                  fullWidth
                  type="text"
                  label={strings.description}
                  value={description}
                  variant="outlined"
                  multiline
                  rows={4}
                  inputProps={{
                    style: {
                      height: "100%",
                    },
                  }}
                  onChange={handleDescriptionChange}
                />
              )}
            </TextareaMarkdown.Wrapper>
            {!os.isAndroid && isDesktop && (
              <Preview className="preview">
                <Markup ref={printRef} children={description} />
              </Preview>
            )}
          </Stack>
        </span>
        <Stack
          style={{
            marginTop: 8,
          }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Button fullWidth variant="contained" disableElevation onClick={edit ? handleEdit : handleSave}>
            {strings.save}
          </Button>
          <Button fullWidth variant="outlined" onClick={handlePreviewOrPrint}>
            {" "}
            {!os.isAndroid && isDesktop ? strings.print : strings.preview}
          </Button>
        </Stack>
      </section>
    </Page>
  );
}

const Preview = styled("div")(({ theme }) => ({
  flex: 1,
  height: "100%",
  width: "100%",
  minHeight: "100%",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  borderStyle: "solid",
  borderWidth: "1px",
  minWidth: "0%",
  borderColor: "rgba(0, 0, 0, 0.23)",
  article: {
    position: "absolute",
    overflowY: "scroll",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    height: "100%",
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default AddCardToGroupActivity;
