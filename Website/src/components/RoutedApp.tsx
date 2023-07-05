import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { Page, RouterNavigator, RouterUtil, Toolbar, ToolbarButton } from "react-onsenui";
import { App } from "../view/App";
import { IntroActivity } from "../view/IntroActivity";
import { Icon } from "./Icon";
import { Context, Extra } from "../hooks/useActivity";
import { obj } from "googlers-tools";
import { Drawer } from "../view/App/components/Drawer";
import { useSettings } from "@Hooks/useSettings";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { StyledSection } from "./StyledSection";
import { Button } from "@mui/material";
import SettingsActivity from "./../view/SettingsActivity";
import { Splitter } from "./onsenui/Splitter";

const RoutedApp = (): JSX.Element => {
  const { settings } = useSettings();

  const [isSplitterOpen, setIsSplitterOpen] = useState(false);

  const hideSplitter = () => {
    setIsSplitterOpen(false);
  };

  const showSplitter = () => {
    setIsSplitterOpen(true);
  };

  const ignoreThat = RouterUtil.init([
    {
      component: settings.intro_finised ? App : IntroActivity,
      // component: DangerEditActivity,
      props: {
        key: "main",
        context: {
          pushPage: (props: PushPropsCore) => pushPage(props),
          splitter: {
            show: () => showSplitter(),
            hide: () => hideSplitter(),
            state: isSplitterOpen,
          },
        },
      },
    },
  ]);

  const [routeConfig, setRouteConfig] = useState<any>(ignoreThat);

  const popPage = (options = {}) => {
    setRouteConfig((prev: any) =>
      RouterUtil.pop({
        routeConfig: prev,
        options: {
          ...options,
          animationOptions: {
            duration: 0.2,
            timing: "ease-in",
            animation: "fade-md",
          },
        },
      })
    );
  };

  const pushPage = (props: PushPropsCore): void => {
    const route = {
      component: props.component,
      props: {
        key: props.props.key,
        extra: props.props?.extra,
        context: {
          popPage: (options = {}) => popPage(options),
          pushPage: (props: PushPropsCore) => pushPage(props),
          splitter: {
            show: () => showSplitter(),
            hide: () => hideSplitter(),
            state: isSplitterOpen,
          },
        },
      },
    };

    const options = {};

    setRouteConfig((prev: any) =>
      RouterUtil.push({
        routeConfig: prev,
        route: route,
        options: options,
        key: props.props.key,
      })
    );
  };

  const onPostPush = () => {
    setRouteConfig((prev: any) => RouterUtil.postPush(prev));
  };

  const onPostPop = () => {
    setRouteConfig((prev: any) => RouterUtil.postPop(prev));
  };

  const renderPage = (route: any) => {
    const props = route.props || {};
    const newProps = obj.omit(["extra", "context"], props);
    return (
      <ErrorBoundary fallback={fallback}>
        <Extra.Provider key={props.key + "_extra"} value={props.extra}>
          <Context.Provider key={props.key + "_context"} value={props.context}>
            <route.component {...newProps} />
          </Context.Provider>
        </Extra.Provider>
      </ErrorBoundary>
    );
  };

  const renderSpliterToolbar = () => {
    return (
      <>
        <Toolbar modifier="noshadow">
          <div className="center">Kartei</div>
          <div className="right">
            <ToolbarButton onClick={hideSplitter}>
              <Icon icon={CloseRounded} keepLight />
            </ToolbarButton>
          </div>
        </Toolbar>
      </>
    );
  };

  const fallback = (error: Error, errorInfo: React.ErrorInfo, resetErrorBoundary) => {
    const style = {
      backgroundColor: "#ebeced",
      borderRadius: 6,
      lineHeight: 1.45,
      overflow: "auto",
      padding: 16,
    };

    const handleOpenSettings = () => {
      pushPage({
        component: SettingsActivity,
        props: {
          key: "settings",
          extra: {},
        },
      });
    };

    return (
      <Page
        renderToolbar={() => {
          return (
            <Toolbar modifier="noshadow">
              <div className="center">We hit a brick!</div>
            </Toolbar>
          );
        }}
      >
        <StyledSection>
          <pre style={style}>
            <span>{error.message}</span>
          </pre>

          <Button fullWidth variant="contained" disableElevation onClick={resetErrorBoundary}>
            Try again
          </Button>
          <Button style={{ marginTop: 16 }} fullWidth variant="contained" disableElevation onClick={handleOpenSettings}>
            Open settings
          </Button>

          <pre style={style}>
            <code>{errorInfo.componentStack}</code>
          </pre>
        </StyledSection>
      </Page>
    );
  };

  return (
    <Page>
      <Splitter>
        <Splitter.Side
          side="left"
          width={250}
          collapse={true}
          swipeable={false}
          isOpen={isSplitterOpen}
          onClose={hideSplitter}
          onOpen={showSplitter}
        >
          <Drawer renderToolbar={renderSpliterToolbar} hideSplitter={hideSplitter} pushPage={pushPage} />
        </Splitter.Side>
        <Splitter.Content>
          <RouterNavigator
            swipeable={true}
            swipePop={(options: any) => popPage(options)}
            routeConfig={routeConfig}
            renderPage={renderPage}
            onPostPush={() => onPostPush()}
            onPostPop={() => onPostPop()}
          />
        </Splitter.Content>
      </Splitter>
    </Page>
  );
};

export default RoutedApp;
