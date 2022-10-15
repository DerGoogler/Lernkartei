import printHtmlBlock from "print-html-block";
import { Stack, styled, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ons from "onsenui";
import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import AceEditor from "react-ace";
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
} from "@mui/icons-material";
import DescriptonActivity from "../DescriptonActivity";
import { isDesktop, isMobile } from "react-device-detect";
import { useConfirm } from "material-ui-confirm";
import { os } from "../../native/Os";
import { useKartei } from "../../hooks/useKartei";
import { Markup } from "../../components/Markdown";
import { useActivity } from "../../hooks/useActivity";
import { BackButton } from "../../components/BackButton";
import { useStrings } from "../../hooks/useStrings";
import { useReactToPrint } from "react-to-print";

type Extra = { card: Karten; index: number; edit: boolean; cardIndex: number; shortDesc: string; desc: string };

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

function AddCardToGroupActivity() {
  const { context, extra } = useActivity<Extra>();
  const { strings } = useStrings();
  const { cards, setCards, actions } = useKartei();

  const { edit, desc, shortDesc, index, card, cardIndex } = extra;
  const [shortDescription, setShortDescription] = React.useState(edit ? shortDesc : "");
  const [description, setDescription] = React.useState(edit ? desc : "");
  const [shortDescriptionError, setShortDescriptionError] = React.useState(edit ? false : true);
  const markdownRef = React.useRef<TextareaMarkdownRef>(null);
  const printRef = React.useRef<HTMLDivElement>(null);

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

  const handleBackButtonClick = context.popPage;
  os.useOnBackPressed(handleBackButtonClick);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={handleBackButtonClick} />
        </div>
        <div className="center">{edit ? strings.edit_card : strings.new_card}</div>
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
            // margin="dense"
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
          {formatTXT.map((El) => (
            <ToggleButton
              // sx={(theme) => ({
              //   border: `1px solid ${
              //     theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)"
              //   }`,
              // })}
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
            </TextareaMarkdown.Wrapper>
            {!os.isAndroid && isDesktop && (
              <Preview className="preview">
                <Markup ref={printRef} children={`## ${shortDescription}\n\n${description}`} />
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
