import { Add } from "@mui/icons-material";
import { Fade, styled } from "@mui/material";
import { Disappear } from "react-disappear";
import { Toolbar, ToolbarButton } from "react-onsenui";
import { BackButton, Page } from "react-onsenui";
import { Icon } from "../../components/Icon";
import Material3 from "../../components/Material3";
import AddCardToGroupActivity from "../AddCardToGroupActivity";
import { Searchbar } from "../../components/Searchbar";
import { os } from "../../native/Os";
import { StyledSection } from "../../components/StyledSection";
import { useState } from "react";
import React from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useActivity } from "../../hooks/useActivity";

const CardListBuilder = React.lazy(() => import("./components/CardListBuilder"));

export function ViewCardActivity() {
  const { context, extra } = useActivity<any>();

  os.useOnBackPressed(context.popPage);

  const [fabShow, setFabShow] = useState(true);
  const [titleShow, setTitleShow] = useState(true);
  const [search, setSearch] = useState("");

  const { index, title, desc } = extra;

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage}>Back</BackButton>
        </div>
        <div className="center">
          <Fade in={titleShow}>
            <span>{title}</span>
          </Fade>
        </div>
        <div className="right">
          <ToolbarButton
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
            }}
          >
            <Icon icon={Add} keepLight />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  };

  return (
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
        <Searchbar placeholder="Karten suchen ..." onSearchClick={(value) => setSearch(value)} />
        <React.Suspense fallback={<LoadingScreen />}>
          <CardListBuilder search={search} />
        </React.Suspense>
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
