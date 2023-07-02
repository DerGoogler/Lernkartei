import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import {
  Card,
  Page,
  RouterNavigator,
  RouterUtil,
  Splitter,
  SplitterContent,
  SplitterSide,
  Toolbar,
  ToolbarButton,
} from "react-onsenui";
import { App } from "../view/App";
import { IntroActivity } from "../view/IntroActivity";
import { Icon } from "./Icon";
import { Context, Extra } from "../hooks/useActivity";
import { obj } from "googlers-tools";
import { Drawer } from "../view/App/components/Drawer";
import { useSettings } from "@Hooks/useSettings";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

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
      props: {
        key: "main",
        context: {
          pushPage: (props: PushPropsCore) => pushPage(props),
          onBackButton: (handler: EventListener) => onBackButton(handler),
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

  const onBackButton = (handler: (e: any) => void) => {
    React.useEffect(() => {
      document.addEventListener("backbutton", handler, true);
      return () => {
        document.removeEventListener("backbutton", handler, true);
      };
    }, [routeConfig]);
  };

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
          onBackButton: (handler: EventListener) => onBackButton(handler),
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
      <Extra.Provider key={props.key + "_extra"} value={props.extra}>
        <Context.Provider key={props.key + "_context"} value={props.context}>
          <route.component {...newProps} />
        </Context.Provider>
      </Extra.Provider>
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

  return (
    <ErrorBoundary
      fallback={(err, errInf) => {
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
            <Card>{err.message}</Card>
            <pre
              style={{
                backgroundColor: "#f6f8fa",
                borderRadius: 6,
                lineHeight: 1.45,
                overflow: "auto",
                padding: 16,
                margin: 16,
              }}
            >
              <code>{errInf.componentStack}</code>
            </pre>
          </Page>
        );
      }}
    >
      <Page>
        <Splitter>
          <SplitterSide
            side="left"
            width={250}
            collapse={true}
            swipeable={false}
            isOpen={isSplitterOpen}
            onClose={hideSplitter}
            onOpen={showSplitter}
          >
            <Drawer renderToolbar={renderSpliterToolbar} hideSplitter={hideSplitter} pushPage={pushPage} />
          </SplitterSide>
          <SplitterContent>
            <RouterNavigator
              swipeable={true}
              swipePop={(options: any) => popPage(options)}
              routeConfig={routeConfig}
              renderPage={renderPage}
              onPostPush={() => onPostPush()}
              onPostPop={() => onPostPop()}
            />
          </SplitterContent>
        </Splitter>
      </Page>
    </ErrorBoundary>
  );
};

export default RoutedApp;
