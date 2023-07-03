import React from "react";
import { Page, Toolbar } from "react-onsenui";
import { Icon } from "../../components/Icon";
import { Add, Menu } from "@mui/icons-material";
import AddActivity from "../AddActivity";
import { BuildConfig } from "../../native/BuildConfig";
import { StyledSection } from "../../components/StyledSection";
import { os } from "../../native/Os";
import { useActivity } from "../../hooks/useActivity";
import { ToolbarButton } from "../../components/ToolbarButton";
import { For } from "@Components/For";
import { useKartei } from "../../hooks/useKartei";
import { GroupCard } from "./components/GroupCard";
import { Alert, AlertTitle, Box } from "@mui/material";
import { useStrings } from "@Hooks/useStrings";
import { Searchbar } from "@Components/Searchbar";

export function App() {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { cards, actions } = useKartei();
  const [search, setSearch] = React.useState("");

  const filteredGroups = React.useMemo(() => actions.filterGroups(search), [cards, search]);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <ToolbarButton
            icon={Menu}
            onClick={() => {
              context.splitter.show();
            }}
          />
        </div>
        <div className="center">Kartei {BuildConfig.DEBUG ? "Debug" : ""}</div>
        <div className="right">
          <ToolbarButton
            icon={Add}
            onClick={() => {
              context.pushPage({
                component: AddActivity,
                props: {
                  key: "add",
                  extra: { editGroup: false },
                },
              });
            }}
          />
        </div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <StyledSection>
        {!os.isAndroid && (
          <Alert
            severity="warning"
            style={{
              marginBottom: 8,
            }}
          >
            <AlertTitle>{strings.warning}</AlertTitle>
            {strings.warning_text_web_version}
          </Alert>
        )}

        <Searchbar placeholder={strings.search_groups} onChange={(e) => setSearch(e.target.value)} />
        <For
          each={filteredGroups}
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
              Add new groups with the
              {
                <Icon
                  sx={(theme) => ({
                    color: theme.palette.secondary.dark,
                    verticalAlign: "middle",
                  })}
                  icon={Add}
                />
              }
              icon
            </Box>
          )}
          catch={(e: Error | undefined) => (
            <Box sx={(theme) => ({ color: theme.palette.text.primary })}>
              There was an error while parsing your cards! Seems that your cards have an invalid JSON Format.
              <br />
              ERROR: {e?.message}
            </Box>
          )}
        >
          {(card, index) => (
            <GroupCard key={String(card.name + index * 5)} card={card} index={index} actions={actions} />
          )}
        </For>
      </StyledSection>
    </Page>
  );
}
