import { Add } from "@mui/icons-material";
import { Fade, styled } from "@mui/material";
import { Disappear } from "react-disappear";
import { Toolbar } from "react-onsenui";
import { BackButton, Page } from "react-onsenui";
import { Icon } from "../../components/Icon";
import Material3 from "../../components/Material3";
import AddCardToGroupActivity from "../AddCardToGroupActivity";
import { Searchbar } from "../../components/Searchbar";
import { os } from "../../native/Os";
import { StyledSection } from "../../components/StyledSection";
import { useState } from "react";
import { CardListBuilder } from "./components/CardListBuilder";

export interface ViewCardActivityProps extends PushProps<any> {}

export function ViewCardActivity({ pageTools, extra }: ViewCardActivityProps) {
  os.useOnBackPressed(pageTools.popPage);

  const [fabShow, setFabShow] = useState(true);
  const [titleShow, setTitleShow] = useState(true);
  const [search, setSearch] = useState("");

  const { card, cards, index, title, desc } = extra;

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={pageTools.popPage}>Back</BackButton>
        </div>
        <div className="center">
          <Fade in={titleShow}>
            <span>{title}</span>
          </Fade>
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
        <Searchbar placeholder="Karten suchen ..." onSearchClick={(value) => setSearch(value)} />
        <CardListBuilder pageTools={pageTools} extra={{ ...extra, ...{ search: search } }} />
      </StyledSection>
    </Page>
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
