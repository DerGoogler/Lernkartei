import { Add } from "@mui/icons-material";
import { Box, Fade, List, ListItemButton, ListItemIcon, ListSubheader, Pagination, Stack, styled } from "@mui/material";
import { Disappear } from "react-disappear";
import { Toolbar } from "react-onsenui";
import { Page } from "react-onsenui";
import { Icon } from "../../components/Icon";
import AddCardToGroupActivity from "../AddCardToGroupActivity";
import { Searchbar } from "../../components/Searchbar";
import { os } from "../../native/Os";
import { StyledSection } from "../../components/StyledSection";
import { useEffect, useState } from "react";
import React from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useActivity } from "../../hooks/useActivity";
import { BackButton } from "../../components/BackButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import PublishIcon from "@mui/icons-material/Publish";
import DownloadIcon from "@mui/icons-material/Download";
import { ToolbarButton } from "../../components/ToolbarButton";
import { BottomSheet } from "../../components/BottomSheet";
import { StyledListItemText } from "../SettingsActivity/components/StyledListItemText";
import { useStrings } from "../../hooks/useStrings";
import { useKartei } from "../../hooks/useKartei";
import { File } from "../../native/File";
import Ajv from "ajv";
import chooseFile from "./chooseFile";
import { useConfirm } from "material-ui-confirm";
import { For } from "@Components/For";
import { usePagination } from "../../hooks/usePagination";
import CardKarte from "./components/CardKarte";

// const CardListBuilder = React.lazy(() => import("./components/CardListBuilder"));

export function ViewCardActivity() {
  const { context, extra } = useActivity<any>();
  const { strings } = useStrings();
  const { cards, setCards, actions } = useKartei();

  os.useOnBackPressed(context.popPage);
  const confirm = useConfirm();

  const [titleShow, setTitleShow] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { index, group, title, desc } = extra;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const karten = cards[index].karten;
  const filteredCards = karten.filter((card) => card.shortDescription.toLowerCase().includes(search.toLowerCase()));

  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const count = Math.ceil(filteredCards.length / PER_PAGE);
  const _DATA = usePagination(filteredCards, PER_PAGE);

  const handleChange = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">
          <Fade in={titleShow}>
            <span>{title}</span>
          </Fade>
        </div>
        <div className="right">
          <ToolbarButton id="group-menu" icon={MoreVertIcon} onClick={handleOpen} />
        </div>
      </Toolbar>
    );
  };

  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

  const schema = {
    type: "object",
    required: ["group", "name", "description", "karten"],
    properties: {
      group: {
        type: "string",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      karten: {
        type: "array",
        items: {
          type: "object",
          required: ["shortDescription", "description"],
          properties: {
            shortDescription: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
        },
      },
    },
  };

  const handleFileChange = (event: any) => {
    chooseFile(event, (event: any, file: any, input: any) => {
      const validate = ajv.compile(schema);

      const content = JSON.parse(event.target.result);

      const valid = validate(content) as boolean;
      if (valid) {
        confirm({
          title: "Override Import",
          description:
            "Beim Override Import werden alle Karten und Gruppen information überschrieben. Sei vorsichtig mit dieser Funktion!",
          confirmationText: "Fortfahren",
          cancellationText: "Abbrechen",
        })
          .then(() => {
            setCards((t) => {
              if (t[index].group === content.group) {
                t[index] = content;
              } else {
                os.toast("Group does not matches the group id!", "short");
              }
              return t;
            });
          })
          .catch(() => {});
      } else {
        alert(JSON.stringify(validate.errors, null, 2));
      }
      handleClose();
    });
  };

  return (
    <>
      <Page renderToolbar={renderToolbar}>
        <Header>
          <HeaderTitle
            wrapper="div"
            onDisappear={(visible) => {
              setTitleShow(!visible);
            }}
          >
            <div className="header-title">{title}</div>
            <div className="header-desc">{desc}</div>
          </HeaderTitle>
        </Header>
        <StyledSection>
          <Searchbar placeholder={strings.search_karten} onSearch={(val) => setSearch(val)} />

          <Stack style={{ marginBottom: 8 }} direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Pagination
              count={count}
              color="primary"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          </Stack>
          <For
            each={_DATA.currentData()}
            fallback={() => (
              <Box
                component="h4"
                sx={(theme) => ({
                  color: theme.palette.secondary.dark,
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  textAlign: "center",
                  WebkitTransform: "translate(-50%, -50%)",
                  transform: "translate(-50%, -50%)",
                })}
              >
                To add new cards, click on the{" "}
                <Icon
                  sx={(theme) => ({
                    color: theme.palette.secondary.dark,
                    verticalAlign: "middle",
                  })}
                  icon={MoreVertIcon}
                />{" "}
                icon, and add a new card with the{" "}
                <Icon
                  sx={(theme) => ({
                    color: theme.palette.secondary.dark,
                    verticalAlign: "middle",
                  })}
                  icon={Add}
                />{" "}
                icon
              </Box>
            )}
            catch={(e: Error | undefined) => (
              <Box sx={(theme) => ({ color: theme.palette.text.primary })}>ERROR: {e?.message}</Box>
            )}
          >
            {(card, index) => <CardKarte actions={actions} card={card} index={index} />}
          </For>
        </StyledSection>
      </Page>

      <BottomSheet open={open} onCancel={handleClose}>
        <List
          subheader={
            <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Addings</ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => {
              context.pushPage({
                component: AddCardToGroupActivity,
                props: {
                  key: "add",
                  extra: {
                    index: index,
                    edit: false,
                  },
                },
              });
              handleClose();
            }}
          >
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <StyledListItemText primary={strings.new_card} />
          </ListItemButton>
        </List>

        <Divider />
        <List
          subheader={
            <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Manage Group</ListSubheader>
          }
        >
          <label htmlFor={title + "_override-import"}>
            <ListItemButton>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <StyledListItemText primary="Override Import (Beta)" />
            </ListItemButton>
          </label>
          <ListItemButton
            onClick={() => {
              const file = new File(`${title}.group.json`);
              file.createJSON(cards[index], 4);
            }}
          >
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            <StyledListItemText primary="Export" />
          </ListItemButton>
        </List>
      </BottomSheet>
      <input
        // ...
        id={title + "_override-import"}
        key={title + "_override-import"}
        type="file"
        style={{ display: "none", marginRight: "4px" }}
        accept=".json"
        onChange={handleFileChange}
      />
    </>
  );
}

const Header = styled("div")(({ theme }) => ({
  padding: "50px",
  paddingTop: "6px",
  textAlign: "center",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  // boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 5px",
}));

const HeaderTitle = styled(Disappear)(({ theme }) => ({
  display: "block",
  "& > .header-title": {
    fontSize: 30,
  },
  "& > .header-desc": {
    fontSize: 18,
  },
}));
