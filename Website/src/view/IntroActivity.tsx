import { Done } from "@mui/icons-material";
import * as React from "react";
import { Button, Carousel, CarouselItem, Page, Toolbar, ToolbarButton } from "react-onsenui";
import { App } from "./App";
import { Icon } from "../components/Icon";
import { os } from "../native/Os";
import { sharedpreferences, useBoolean } from "../native/SharedPreferences";

interface Props extends PushProps {}

interface State {
  items: any[];
  index: number;
}

function IntroActivity({ pageTools }: Props) {
  const [getIndex, setIndex] = React.useState(0);
  const [getItems, setItems] = React.useState<Array<any>>([
    {
      text: 'Willkommen! In dieser App hast Du die Möglichkeit, diverse Themen in Gruppen als "Kartei" zu speichern. Du kannst deine Gruppen und Karten jederzeit bearbeiten. Du solltest jedoch beachten, dass die Löschung der App oder das leeren des Web-Speichers all deine Karten und Gruppen verloren gehen können.',
      bg: "#F1948A",
    },
    {
      text: "Deine Gruppen und Karten werden in einer sogenannten JSON-Datei gespeichert (In Google findest Du mehr drueber). Diese Datei wird wichtig sein, denn sie beinhaltet all deine Gruppen und Karten.",
      bg: "#D7BDE2",
    },
  ]);
  const [introFinised, setIntroFinised] = useBoolean("introFinised", false);

  os.useOnBackPressed(() => os.close());

  const handleChange = (e: any) => {
    setIndex(e.activeIndex);
  };

  const renderToolbar = () => {
    return (
      <Toolbar>
        <div className="center">Intro</div>
        <div className="right">
          {getIndex === 1 && (
            <ToolbarButton
              onClick={() => {
                if (getIndex === 1) {
                  setIntroFinised(true);
                  pageTools.pushPage({
                    component: App,
                    props: {
                      key: "app",
                      extra: {},
                    },
                  });
                }
              }}
            >
              <Icon icon={Done} keepLight />
            </ToolbarButton>
          )}
        </div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Carousel onPostChange={handleChange} index={getIndex} fullscreen swipeable autoScroll overscrollable>
        {getItems.map((item, index) => (
          <CarouselItem key={index} style={{ backgroundColor: item.bg }}>
            <div
              style={{
                textAlign: "center",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
                fontSize: 20,
              }}
            >
              {item.text}
            </div>
          </CarouselItem>
        ))}
      </Carousel>

      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          position: "absolute",
          bottom: "36px",
          left: "0px",
          right: "0px",
        }}
      >
        {getItems.map((item, index) => (
          <span
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIndex(index);
            }}
          >
            {getIndex === index ? "\u25CF" : "\u25CB"}
          </span>
        ))}
      </div>
    </Page>
  );
}

export { IntroActivity };
