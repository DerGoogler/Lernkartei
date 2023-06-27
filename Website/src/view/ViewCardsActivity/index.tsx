import { Add } from "@mui/icons-material";
import { Box, Fade, Pagination, Stack, styled } from "@mui/material";
import { Disappear } from "react-disappear";
import { Toolbar } from "react-onsenui";
import { Page } from "react-onsenui";
import { Icon } from "../../components/Icon";
import AddCardToGroupActivity from "../AddCardToGroupActivity";
import { Searchbar } from "../../components/Searchbar";
import { os } from "../../native/Os";
import { StyledSection } from "../../components/StyledSection";
import { useState } from "react";
import { useActivity } from "../../hooks/useActivity";
import { BackButton } from "../../components/BackButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import { ToolbarButton } from "../../components/ToolbarButton";
import { useStrings } from "../../hooks/useStrings";
import { useKartei } from "../../hooks/useKartei";
import { File } from "../../native/File";
import { For } from "@Components/For";
import { usePagination } from "../../hooks/usePagination";
import CardKarte from "./components/CardKarte";

export function ViewCardActivity() {
  const { context, extra } = useActivity<any>();
  const { strings } = useStrings();
  const { cards, actions } = useKartei();

  const [titleShow, setTitleShow] = useState(true);
  const [search, setSearch] = useState("");

  const { index, group, title, desc, readonly } = extra;

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
          <ToolbarButton
            icon={DownloadIcon}
            onClick={() => {
              try {
                const file = new File(`${group}.${Math.floor(Math.random() * 5000000)}.json`);
                file.createJSON(cards[index], 4);
                os.toast("Groups has been successfully exported!", "short");
              } catch (e) {
                alert((e as Error).message);
              }
            }}
          />
          {!readonly && (
            <ToolbarButton
              icon={Add}
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
            />
          )}
        </div>
      </Toolbar>
    );
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
