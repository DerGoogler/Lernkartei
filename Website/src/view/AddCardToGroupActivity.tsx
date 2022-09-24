import printHtmlBlock from "print-html-block";
import { Stack, styled, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ons from "onsenui";
import * as React from "react";
import { BackButton, Page, Toolbar } from "react-onsenui";
import TextareaMarkdown, { Command, TextareaMarkdownRef } from "textarea-markdown-editor";
import Material3 from "../components/Material3";
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
} from "@mui/icons-material";
import DescriptonActivity from "./DescriptonActivity";
import { isDesktop, isMobile } from "react-device-detect";
import { useConfirm } from "material-ui-confirm";
import { os } from "../native/Os";
import { useKartei } from "../hooks/useKartei";
import { Markup } from "../components/Markdown";

type PP = { card: Karten; index: number; edit: boolean; cardIndex: number; shortDesc: string; desc: string };

interface Props extends PushProps<PP> {}

type TXTFormat = {
  name: string;
  icon: React.ElementType;
  iconStyle?: React.CSSProperties;
};
const formatTXT: TXTFormat[] = [
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
  },
  {
    name: "insert-warnmark",
    icon: WarningAmberRounded,
    iconStyle: {
      color: "#d29922",
    },
  },
  {
    name: "insert-dangermark",
    icon: CloseRounded,
    iconStyle: {
      color: "#cf222e",
    },
  },
];

function AddCardToGroupActivity({ pageTools, extra }: Props) {
  const { edit, desc, shortDesc, index, card, cardIndex } = extra;
  const [shortDescription, setShortDescription] = React.useState(edit ? shortDesc : "");
  const [description, setDescription] = React.useState(edit ? desc : "");
  const [shortDescriptionError, setShortDescriptionError] = React.useState(edit ? false : true);
  const [cards, setCards] = useKartei();
  const markdownRef = React.useRef<TextareaMarkdownRef>(null);

  const confirm = useConfirm();
  // **** Experimental
  // const handleBackButtonClick = (event?: React.MouseEvent<HTMLElement>) => {
  //   event?.preventDefault();
  //   confirm({
  //     title: "Verlassen?",
  //     description: "Bist Du dir sicher, dass Du die Bearbeitung aufgeben willst?",
  //   }).then(() => pageTools.popPage());
  // };
  // os.useOnBackPressed(handleBackButtonClick);

  const handleBackButtonClick = pageTools.popPage;
  os.useOnBackPressed(handleBackButtonClick);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={handleBackButtonClick}>Back</BackButton>
        </div>
        <div className="center">{edit ? "Karte bearbeiten" : "Neue Karte"}</div>
      </Toolbar>
    );
  };
  const customTextareaCommands: Command[] = [
    {
      name: "insert-checkmark",
      handler: ({ cursor }) => {
        // MARKER - means a cursor position, or a selection range if specified two markers
        cursor.insert(`${cursor.MARKER}<checkmark/>${cursor.MARKER}`);
      },
    },
    {
      name: "insert-dangermark",
      handler: ({ cursor }) => {
        // MARKER - means a cursor position, or a selection range if specified two markers
        cursor.insert(`${cursor.MARKER}<dangermark/>${cursor.MARKER}`);
      },
    },
    {
      name: "insert-warnmark",
      handler: ({ cursor }) => {
        // MARKER - means a cursor position, or a selection range if specified two markers
        cursor.insert(`${cursor.MARKER}<warnmark/>${cursor.MARKER}`);
      },
    },
  ];

  const handleSave = () => {
    if (shortDescription != "") {
      try {
        const obj: Karten = {
          shortDescription: shortDescription,
          description: description,
        };

        let tmp: Kartei[] = [];
        tmp = cards;
        tmp[index].karten.push(obj);
        setCards(tmp);
        pageTools.popPage();
        os.toast("Deine Karte wurde gespeichert.", "short");
      } catch (error) {
        alert((error as Error).message);
      }
    } else {
      os.toast("Kurz Beschreibung darf nicht leer sein!", "short");
    }
  };

  const handleEdit = () => {
    let tmp: Kartei[] = [];
    tmp = cards;
    tmp[cardIndex].karten[index].shortDescription = shortDescription;
    tmp[cardIndex].karten[index].description = description;

    if (shortDescription === "") {
      ons.notification.alert("Kurz Beschreibung darf nicht leer sein!");
    } else {
      setCards(tmp);
      pageTools.popPage();
    }
  };

  const handleShortDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortDescription(e.target.value);
    setShortDescriptionError(e.target.value === "");
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <section style={{ padding: 8, height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <span>
          <TextField
            fullWidth
            // margin="dense"
            type="text"
            label="Kurze Beschreibung"
            value={shortDescription}
            error={shortDescriptionError}
            helperText={shortDescriptionError ? "Darf nicht leer sein" : ""}
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
          {formatTXT.map((El) => (
            <ToggleButton
              style={{
                border: "1px solid rgb(196, 196, 196)",
              }}
              value={El.name}
              key={El.name}
              onClick={() => markdownRef.current?.trigger(El.name)}
            >
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
              <StyledTextField
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                }}
                fullWidth
                type="text"
                label="Beschreibung"
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
            </TextareaMarkdown.Wrapper>
            {!os.isAndroid && isDesktop && (
              <Preview className="preview">
                <Markup children={description} />
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
          <Material3.Button modifier="large" onClick={edit ? handleEdit : handleSave}>
            Speichern
          </Material3.Button>
          <Material3.Button
            modifier="large"
            onClick={() => {
              if (!os.isAndroid && isDesktop) {
                printHtmlBlock(".preview", {
                  importStyle: true,
                });
              } else {
                pageTools.pushPage<any>({
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
            }}
          >
            {!os.isAndroid && isDesktop ? "Drucken" : "Ansicht"}
          </Material3.Button>
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
  // overflow: "hidden",
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
