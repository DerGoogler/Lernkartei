import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import { Icon } from "../../components/Icon";
import { Add, Menu } from "@mui/icons-material";
import AddActivity from "../AddActivity";
import Material3 from "../../components/Material3";
import { BuildConfig } from "../../native/BuildConfig";
import { StyledSection } from "../../components/StyledSection";
import { os } from "../../native/Os";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useActivity } from "../../hooks/useActivity";
import { ToolbarButton } from "../../components/ToolbarButton";
import { For } from "@Components/For";
import { useKartei } from "../../hooks/useKartei";
import { GroupCard } from "./components/GroupCard";
import { Box } from "@mui/material";

export function App() {
  const { context } = useActivity();
  const { cards, actions } = useKartei();

  os.useOnBackPressed(() => {
    if (context.splitter.state()) {
      context.splitter.hide();
    } else {
      os.close();
    }
  });

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
        <For
          each={cards}
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
              Add new groups with the{" "}
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
            <Box sx={(theme) => ({ color: theme.palette.text.primary })}>
              There was an error while parsing your cards! Seems that your cards have an invalid JSON Format.
              <br />
              ERROR: {e?.message}
            </Box>
          )}
        >
          {(card, index) => <GroupCard card={card} index={index} actions={actions} />}
        </For>
      </StyledSection>
    </Page>
  );
}
