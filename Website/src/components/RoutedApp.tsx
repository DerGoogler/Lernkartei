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
import { sharedpreferences } from "../native/SharedPreferences";
import { colors, default_scheme } from "../theme";
import drawerItems from "../util/drawerItem";
import { IntroActivity } from "../view/IntroActivity";
import ErrorBoundary from "./ErrorBoundary";
import { Icon } from "./Icon";

interface States {
  isSplitterOpen: boolean;
  routeConfig: any;
}

interface Props {}

class RoutedApp<A = {}> extends Component<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);

    const Intro = () => {
      if (sharedpreferences.getBoolean("introFinised", false)) {
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
          pageTools: {
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

  public componentDidMount() {
    // This depends on createTheme
    // @ts-ignore
    os.setStatusBarColor(colors[default_scheme.value][900], false);
  }

  private pushPage<A = {}>(props: PushPropsCore<A>): void {
    const route = {
      component: props.component,
      props: {
        key: props.props.key,
        extra: props.props?.extra,
        pageTools: {
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

    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.push({
      routeConfig,
      route,
    });

    this.setState({ routeConfig });
  }

  private popPage = (options = {}) => {
    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.pop({
      routeConfig,
      options: {
        ...options,
        animationOptions: {
          duration: 0.2,
          timing: "ease-in",
          animation: "fade-md",
        },
      },
    });

    this.setState({ routeConfig });
  };

  private onPostPush = () => {
    const routeConfig = RouterUtil.postPush(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  private onPostPop = () => {
    const routeConfig = RouterUtil.postPop(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  private renderPage = (route: any) => {
    const props = route.props || {};
    return <route.component {...props} />;
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
              <Page renderToolbar={this.renderSpliterToolbar}>
                <List
                  dataSource={drawerItems}
                  renderRow={(item: DrawerListItems): JSX.Element => (
                    <>
                      <ListHeader key={item.title}>{item.title}</ListHeader>
                      {item.content.map(
                        (contentItem: DrawerListItemsContent): JSX.Element => (
                          <>
                            <ListItem
                              key={`${item.title}_item`}
                              {...contentItem}
                              onClick={(event: React.MouseEvent<any, MouseEvent>) => {
                                contentItem.onClick!(this.hideSplitter.bind(this), this.pushPage, event);
                              }}
                            />
                          </>
                        )
                      )}
                    </>
                  )}
                />
              </Page>
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
