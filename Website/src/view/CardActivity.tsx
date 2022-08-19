import { Add, Edit, EditRounded } from "@mui/icons-material";

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import reactStringReplace from "react-string-replace";
import * as React from "react";
import { Disappear } from "react-disappear";
import { Ripple, ToolbarButton } from "react-onsenui";
import { BackButton, Page, Toolbar } from "react-onsenui";
import { Icon } from "../components/Icon";
import Material3 from "../components/Material3";
import AddCardToGroupActivity from "./AddCardToGroupActivity";
import DescriptonActivity from "./DescriptonActivity";
import webview from "../native/WebView";
import Const from "../util/Const";
import { Searchbar } from "../components/Searchbar";
import { rct } from "googlers-tools";

interface Props extends PushProps<any> {}

function CardListBuilder({ pageTools, extra }: Props) {
  const { index: iindex } = extra;
  const getCards = webview.pref.getJSON<Array<Kartei>>("katei", [])[iindex].karten;

  const Lrender = (map: Array<Karten>, search: string) => {
    const filteredCards = map.filter((card) => card.shortDescription.toLowerCase().includes(search.toLowerCase()));
    return filteredCards.map((card, index) => {
      return (
        <Card style={{ margin: 8 }} key={`item_${index}`} variant="outlined">
          <CardContent
            onClick={() => {
              pageTools.pushPage<typeof extra>({
                component: DescriptonActivity,
                props: {
                  key: `card_${card.shortDescription}`,
                  extra: {
                    desc: card.description,
                    shortDesc: card.shortDescription,
                    index: index,
                  },
                },
              });
            }}
          >
            <Typography key={"cardctntbdy_" + index} variant="body1">
              {reactStringReplace(card.shortDescription, /\*\*(\w+)\*\*/g, (match, i) => (
                <strong>{match}</strong>
              ))}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="delete" onClick={handleClickOpenDelete}>
              <DeleteRounded />
            </IconButton> */}
            <IconButton
              aria-label="edit"
              onClick={() => {
                pageTools.pushPage({
                  component: AddCardToGroupActivity,
                  props: {
                    key: "edit",
                    extra: {
                      card: null,
                      desc: card.description,
                      shortDesc: card.shortDescription,
                      index: index,
                      cardIndex: iindex,
                      edit: true,
                    },
                  },
                });
              }}
            >
              <EditRounded />
            </IconButton>
          </CardActions>
        </Card>
      );
    });
  };

  const resultsRender = [];

  for (var i = 0; i < getCards.length; i += 2) {
    resultsRender.push(
      <Grid item xs={6} key={i}>
        {Lrender(getCards.slice(i, i + 2), extra.search)}
      </Grid>
    );
  }

  const checkDeviceSize = (element: JSX.Element): JSX.Element => {
    if (webview.isTablet) {
      return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {element}
        </Grid>
      );
    } else {
      return element;
    }
  };

  return checkDeviceSize(
    <React.Fragment>
      {getCards.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            height: "80%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#757575",
            }}
          >
            Erstelle neue Karten mit dem{" "}
            <Icon
              icon={Edit}
              style={{
                verticalAlign: "middle",
              }}
            />{" "}
            in der Toolbar
          </span>
        </div>
      ) : webview.isTablet ? (
        resultsRender
      ) : (
        Lrender(getCards, extra.search)
      )}
    </React.Fragment>
  );
}

type GroupEditProps = PushProps<any> & {
  name: string;
  desc: string;
};

function GroupEdit({ pageTools, extra, name, desc }: GroupEditProps) {
  const [show, setShow] = rct.useState(false);
  const [editName, setEditName] = rct.useState(name);
  const [editDesc, setEditDesc] = rct.useState(desc);

  const handleGroupNameEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleGroupDescEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDesc(e.target.value);
  };

  const showAlertDialog = () => {
    setShow(true);
  };
  const hideAlertDialog = () => {
    setShow(false);
  };

  const saveEdit = () => {
    const { card, index } = extra;

    let groups = [];
    groups = webview.pref.getJSON<Array<Kartei>>("katei", []);
    groups[index].name = editName;
    groups[index].description = editDesc;
    webview.pref.setJSON<Array<Kartei>>("katei", groups);
    hideAlertDialog();
    pageTools.popPage();
  };

  return (
    <React.Fragment>
      <ToolbarButton onClick={showAlertDialog}>
        <Icon icon={Edit} keepLight />
      </ToolbarButton>
      <Dialog open={show} onClose={hideAlertDialog}>
        <DialogTitle>Gruppe bearbeiten</DialogTitle>
        <DialogContent>
          <DialogContentText>Hier kannst Du deine Gruppe nachträglich bearbeiten</DialogContentText>
          <TextField
            fullWidth
            margin="dense"
            type="text"
            label="Name"
            value={editName}
            variant="outlined"
            onChange={handleGroupNameEdit}
          />
          <TextField
            fullWidth
            margin="dense"
            type="text"
            label="Beschreibung"
            value={editDesc}
            variant="outlined"
            onChange={handleGroupDescEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideAlertDialog}>Abbrechen</Button>
          <Button onClick={saveEdit}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function CardActivity({ pageTools, extra }: Props) {
  webview.useOnBackPressed(pageTools.popPage);

  const [fabShow, setFabShow] = rct.useState(true);
  const [titleShow, setTitleShow] = rct.useState(true);
  const [search, setSearch] = rct.useState("");
  const [toolbarModifier, setToolbarModifier] = rct.useState("noshadow");

  const { card, cards, index, title, desc } = extra;

  const renderToolbar = () => {
    return (
      <Toolbar modifier={toolbarModifier}>
        <div className="left">
          <BackButton onClick={pageTools.popPage}>Back</BackButton>
        </div>
        <div className="center">
          <Fade in={titleShow}>
            <span>{title}</span>
          </Fade>
        </div>
        <div className="right">
          <GroupEdit pageTools={pageTools} name={title} desc={desc} extra={extra} />
        </div>
      </Toolbar>
    );
  };

  const renderFixed = () => {
    const { title, cards, index } = extra;

    return (
      <Fade in={fabShow}>
        <div>
          <Material3.Fab
            position="bottom right"
            onClick={() => {
              pageTools.pushPage({
                component: AddCardToGroupActivity,
                props: {
                  key: "add",
                  extra: {
                    card: cards,
                    index: index,
                    edit: false,
                  },
                },
              });
            }}
          >
            <Icon
              icon={Add}
              keepLight
              style={{
                height: "100%",
              }}
            />
          </Material3.Fab>
        </div>
      </Fade>
    );
  };

  return (
    <Page renderToolbar={renderToolbar} renderFixed={renderFixed}>
      <Header
        wrapper="div"
        onDisappear={(visible) => {
          setToolbarModifier(visible ? "noshadow" : "");
          setFabShow(visible);
        }}
      >
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
      <Searchbar placeholder="Karten suchen ..." onSearchClick={(value) => setSearch(value)} />
      <CardListBuilder pageTools={pageTools} extra={{ ...extra, ...{ search: search } }} />
    </Page>
  );
}

const Header = styled(Disappear)(({ theme }) => ({
  padding: "50px",
  paddingTop: "6px",
  textAlign: "center",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 5px",
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

export default CardActivity;
