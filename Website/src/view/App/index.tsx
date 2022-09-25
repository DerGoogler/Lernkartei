import * as React from "react";
import { Page, ProgressCircular, Toolbar, ToolbarButton } from "react-onsenui";
import { Icon } from "../../components/Icon";
import { Add, Menu } from "@mui/icons-material";
import AddActivity from "../AddActivity";
import Material3 from "../../components/Material3";
import { BuildConfig } from "../../native/BuildConfig";
import { StyledSection } from "../../components/StyledSection";
// import { CardRenderer } from "./components/GroupRenderer";
import { useActivity } from "../../components/RoutedApp";
import { os } from "../../native/Os";
import { useKPlugin } from "../../plugin/kplugin";
import evil from "../../plugin/evil";
import { LoadingScreen } from "../../components/LoadingScreen";

const CardRenderer = React.lazy(() => import("./components/GroupRenderer"));

export function App() {
  const { context } = useActivity();
  const [kplugins, setPlugins] = useKPlugin();

  // These are native Android call, they won't be called on browsers
  // os.useOnBackPressed(() => {
  //   if (context.splitter.state()) {
  //     context.splitter.hide();
  //   } else {
  //     os.close();
  //   }
  // });

  os.useOnResume(() => {
    console.log("User has been returned to the app");
  });

  React.useEffect(() => {
    // Plugins
    kplugins.forEach((kplugin) => {
      evil(kplugin.exec);
    });
  }, []);

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
        <React.Suspense fallback={<LoadingScreen />}>
          <CardRenderer />
        </React.Suspense>
      </StyledSection>
    </Page>
  );
}
