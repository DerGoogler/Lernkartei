import { CloseRounded } from "@mui/icons-material";
import { Component } from "react";
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
import React from "react";
import { Context, Extra } from "../hooks/useActivity";
import { obj } from "googlers-tools";
import { nativeStorage } from "../hooks/useNativeStorage";
import { Drawer } from "../view/App/components/Drawer";

interface States {
  isSplitterOpen: boolean;
  routeConfig: any;
}

interface Props {}

class RoutedApp<A = {}> extends Component<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);

    const Intro = () => {
      if (nativeStorage.getItem("introFinised") === "true") {
        return App;
      } else {
        return IntroActivity;
      }
    };

    const routeConfig = RouterUtil.init([
      {
        component: Intro(),
        props: {
          key: "main",
          context: {
            pushPage: (props: PushPropsCore<A>) => this.pushPage<A>(props),
            splitter: {
              show: () => this.showSplitter(),
              hide: () => this.hideSplitter(),
              state: () => {
                return this.state.isSplitterOpen;
              },
            },
          },
        },
      },
    ]);

    this.state = {
      isSplitterOpen: false,
      routeConfig,
    };

    this.pushPage = this.pushPage.bind(this);
  }

  private handleBackButton() {
    this.popPage();
  }

  public componentDidMount() {
    os.addNativeEventListener("onbackbutton", this.handleBackButton);
  }

  public componentWillUnmount() {
    os.removeNativeEventListener("onbackbutton", this.handleBackButton);
  }

  private pushPage<A = {}>(props: PushPropsCore<A>): void {
    const route = {
      component: props.component,
      props: {
        key: props.props.key,
        extra: props.props?.extra,
        context: {
          popPage: () => this.popPage(),
          pushPage: (props: PushPropsCore<A>) => this.pushPage<A>(props),
          splitter: {
            show: () => this.showSplitter(),
            hide: () => this.hideSplitter(),
            state: () => {
              return this.state.isSplitterOpen;
            },
          },
        },
      },
    };

    const options = {};

    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.push({
      routeConfig: routeConfig,
      route: route,
      options: options,
      key: props.props.key,
    });

    this.setState({ routeConfig: routeConfig });
  }

  private popPage = (options = {}) => {
    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.pop({
      routeConfig: routeConfig,
      options: {
        ...options,
        animationOptions: {
          duration: 0.2,
          timing: "ease-in",
          animation: "fade-md",
        },
      },
    });

    this.setState({ routeConfig: routeConfig });
  };

  private onPostPush = () => {
    const routeConfig = RouterUtil.postPush(this.state.routeConfig);
    this.setState({ routeConfig: routeConfig });
  };

  private onPostPop = () => {
    const routeConfig = RouterUtil.postPop(this.state.routeConfig);
    this.setState({ routeConfig: routeConfig });
  };

  private renderPage = (route: any) => {
    const props = route.props || {};
    const newProps = obj.omit(["extra", "context"], props);
    return (
      <Extra.Provider value={props.extra}>
        <Context.Provider value={props.context}>
          <route.component {...newProps} />
        </Context.Provider>
      </Extra.Provider>
    );
  };

  private hideSplitter() {
    this.setState({ isSplitterOpen: false });
  }

  private showSplitter() {
    this.setState({ isSplitterOpen: true });
  }

  private renderSpliterToolbar = () => {
    return (
      <>
        <Toolbar modifier="noshadow">
          <div className="center">Kartei</div>
          <div className="right">
            <ToolbarButton onClick={this.hideSplitter.bind(this)}>
              <Icon icon={CloseRounded} keepLight />
            </ToolbarButton>
          </div>
        </Toolbar>
      </>
    );
  };

  public render = () => {
    return (
      <>
        <Page>
          <Splitter>
            <SplitterSide
              side="left"
              width={250}
              collapse={true}
              swipeable={false}
              isOpen={this.state.isSplitterOpen}
              onClose={this.hideSplitter.bind(this)}
              onOpen={this.showSplitter.bind(this)}
            >
              <Drawer
                renderToolbar={this.renderSpliterToolbar}
                hideSplitter={this.hideSplitter.bind(this)}
                pushPage={this.pushPage}
              />
            </SplitterSide>
            <SplitterContent>
              <RouterNavigator
                swipeable={true}
                swipePop={(options: any) => this.popPage(options)}
                routeConfig={this.state.routeConfig}
                renderPage={this.renderPage}
                onPostPush={() => this.onPostPush()}
                onPostPop={() => this.onPostPop()}
              />
            </SplitterContent>
          </Splitter>
        </Page>
      </>
    );
  };
}

export default RoutedApp;
