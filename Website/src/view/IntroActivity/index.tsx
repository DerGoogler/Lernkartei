import { Done } from "@mui/icons-material";
import * as React from "react";
import { Carousel, CarouselItem } from "react-onsenui";
import { App } from "../App";
import { useActivity } from "../../hooks/useActivity";
import { useSettings, useTheme } from "../../hooks/useSettings";
import { Phones } from "./components/Phones";
import { UI } from "@Native/components/UI";
import { os } from "@Native/Os";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";

function IntroActivity() {
  const { context, extra } = useActivity();
  const { scheme, theme } = useTheme();

  const { _1, _2 } = Phones({
    screenColor: scheme[500],
    caseColor: scheme[600],
  });

  const [getIndex, setIndex] = React.useState(0);
  const [getItems, setItems] = React.useState<Array<any>>([
    {
      text: (
        <div>
          <span style={{ position: "relative", zIndex: 9 }}>
            In dieser App hast Du die Möglichkeit, diverse Themen in Gruppen als "Kartei" zu speichern. Du kannst deine
            Gruppen und Karten jederzeit bearbeiten. Du solltest jedoch beachten, dass die Löschung der App (oder das
            leeren des Web-Speichers) all deine Gruppen und Karten verloren gehen können.
          </span>
          <_1 style={{ zIndex: 1 }} />
        </div>
      ),
      bg: scheme[100],
    },
    {
      text: (
        <div>
          <span style={{ position: "relative", zIndex: 9 }}>
            Deine Gruppen und Karten werden in einem sogenannten "JSON Format" gespeichert. Diese Datei wird wichtig
            sein, denn sie beinhaltet all deine Gruppen und Karten.
          </span>
          <_2 />
        </div>
      ),
      bg: scheme[100],
    },
  ]);

  const { setSettings } = useSettings();

  const handleChange = (e: any) => {
    setIndex(e.activeIndex);
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Center>Intro</Toolbar.Center>
        <Toolbar.Right>
          {getIndex === 1 && (
            <Toolbar.Button
              icon={Done}
              onClick={() => {
                if (getIndex === 1) {
                  setSettings({ intro_finised: true });
                  context.pushPage({
                    component: App,
                    props: {
                      key: "app",
                      extra: {},
                    },
                  });
                }
              }}
            />
          )}
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <UI.Navigationbar color={scheme[100]} onUmmount={theme.palette.background.default}>
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
    </UI.Navigationbar>
  );
}

export { IntroActivity };
