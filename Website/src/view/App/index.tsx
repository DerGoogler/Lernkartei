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

const CardRenderer = React.lazy(() => import("./components/GroupRenderer"));

export function App() {
  const { context } = useActivity();

  // These are native Android call, they won't be called on browsers
  // os.useOnBackPressed(() => {
  //   if (context.splitter.state()) {
  //     context.splitter.hide();
  //   } else {
  //     os.close();
  //   }
  // });
  os.useOnBackPressed(context.popPage);
  os.useOnResume(() => {
    console.log("User has been returned to the app");
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
        <React.Suspense fallback={<LoadingScreen />}>
          <CardRenderer />
        </React.Suspense>
      </StyledSection>
    </Page>
  );
}
