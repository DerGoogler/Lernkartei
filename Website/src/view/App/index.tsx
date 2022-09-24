import * as React from "react";
import { Page, ProgressCircular, Toolbar, ToolbarButton } from "react-onsenui";
import { Icon } from "../../components/Icon";
import { Add, Menu } from "@mui/icons-material";
import AddActivity from "../AddActivity";
import Material3 from "../../components/Material3";
import { BuildConfig } from "../../native/BuildConfig";
import { StyledSection } from "../../components/StyledSection";
import { CardRenderer } from "./components/GroupRenderer";
import { useActivity } from "../../components/RoutedApp";

export function App() {
  const { context } = useActivity();

  // webview.useOnBackPressed(() => {
  //   if (pageTools.splitter.state()) {
  //     pageTools.splitter.hide();
  //   } else {
  //     webview.close();
  //   }
  // });

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <ToolbarButton
            onClick={() => {
              context.splitter.show();
            }}
          >
            <Icon icon={Menu} keepLight />
          </ToolbarButton>
        </div>
        <div className="center">Kartei {BuildConfig.DEBUG ? "Debug" : ""}</div>
      </Toolbar>
    );
  };

  const renderFixed = () => {
    return (
      <Material3.Fab
        position="bottom right"
        onClick={() => {
          context.pushPage({
            component: AddActivity,
            props: {
              key: "add",
              extra: { editGroup: false },
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
    );
  };

  return (
    <Page renderToolbar={renderToolbar} renderFixed={renderFixed}>
      <StyledSection>
        <React.Suspense
          fallback={
            <ProgressCircular
              indeterminate
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                WebkitTransform: "translate(-50%, -50%)",
                transform: "translate(-50%, -50%)",
              }}
            />
          }
        >
          <CardRenderer />
        </React.Suspense>
      </StyledSection>
    </Page>
  );
}
