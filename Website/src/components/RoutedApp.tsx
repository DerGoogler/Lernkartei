import { CloseRounded } from "@mui/icons-material";
import { Component, useState } from "react";
import {
  List,
  ListHeader,
  ListItem,
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
import { os } from "../native/Os";
import { IntroActivity } from "../view/IntroActivity";
import { Icon } from "./Icon";
import { Context, Extra } from "../hooks/useActivity";
import { obj } from "googlers-tools";
import { useNativeStorage } from "../hooks/useNativeStorage";
import { Drawer } from "../view/App/components/Drawer";

const RoutedApp = (): JSX.Element => {
  const [introFinised, setIntroFinised] = useNativeStorage("introFinised", false);

  const [isSplitterOpen, setIsSplitterOpen] = useState(false);

  const hideSplitter = () => {
    setIsSplitterOpen(false);
  };

  const showSplitter = () => {
    setIsSplitterOpen(true);
  };

  const ignoreThat = RouterUtil.init([
    {
      component: introFinised ? App : IntroActivity,
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
    <>
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
    </>
  );
};

export default RoutedApp;
