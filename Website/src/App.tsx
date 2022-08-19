import * as React from "react";
import { GestureDetector, List, Page, ProgressCircular, Toolbar, ToolbarButton } from "react-onsenui";
import { Icon } from "./components/Icon";
import { Add, DeleteRounded, EditRounded, Menu } from "@mui/icons-material";
import AddActivity from "./view/AddActivity";
import CardActivity from "./view/CardActivity";
import AlertDialog from "./buildrs/AlertDialog";
import Material3 from "./components/Material3";
import webview from "./native/WebView";
import { Alert, AlertTitle, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { Ripple } from "react-onsenui";
import { ArrayMap } from "./components/ArrayMap";
import { isMobile } from "react-device-detect";

interface Props extends PushProps<{}> {}

function CardRenderer({ pageTools, extra }: Props) {
  const getCards = webview.pref.getJSON<Array<Kartei>>("katei", []);

  return (
    <React.Fragment>
      <ArrayMap.fromObject
        map={getCards}
        whenError={(error) => {
          return <>{error.message}</>;
        }}
        whenEmpty={() => {
          return (
            <div
              style={{
                textAlign: "center",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#757575",
                }}
              >
                Druecke auf das{" "}
                <Icon
                  icon={Add}
                  style={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                um dir neue Gruppen zu erstellen
              </span>
            </div>
          );
        }}
        render={(card, index) => {
          return (
            <GestureDetector
              onHold={() => {
                const builder = AlertDialog.Builder;
                builder.setTitle("Löschen");
                builder.setMessage(
                  <span>
                    Möchtest Du die <strong>{card.name}</strong>-Gruppe löschen?
                  </span>
                );
                builder.setPositiveButton("Ja", () => {
                  let tmp = [];
                  try {
                    tmp = webview.pref.getJSON<Kartei[]>("katei", []);
                    webview.pref.setJSON<Kartei[]>(
                      "katei",
                      tmp.filter((remv) => remv.group != card.group)
                    );
                    webview.toast(`${card.name} wurde gelöscht.`, "short");
                  } catch (error) {
                    webview.toast((error as Error).message, "short");
                  }
                });
                builder.setNegativeButtom("Nein");
                builder.setCancelable(false);
                builder.show();
              }}
            >
              <Card key={`item_card_${card.group}`} variant="outlined" style={{ margin: 8 }}>
                <CardContent
                  key={`item_card_${card.group}_content`}
                  onClick={() => {
                    pageTools.pushPage<any>({
                      component: CardActivity,
                      props: {
                        key: `card_item_${card.group}`,
                        extra: {
                          card: card.karten,
                          index: index,
                          title: card.name,
                          desc: card.description,
                        },
                      },
                    });
                  }}
                >
                  <Typography
                    key={`item_card_${card.group}_card_count`}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {card.karten.length != 0 && card.karten.length <= 2
                      ? `${card.karten.length} Karte`
                      : `${card.karten.length} Karten`}
                  </Typography>
                  <Typography key={`item_card_${card.group}_name`} variant="h5" component="div">
                    {card.name}
                  </Typography>

                  <Typography key={`item_card_${card.group}_desc`} variant="body2">
                    {card.description}
                  </Typography>
                </CardContent>
                {/* <CardActions disableSpacing>
                  <IconButton aria-label="delete">
                    <DeleteRounded />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <EditRounded />
                  </IconButton>
                </CardActions> */}
              </Card>
            </GestureDetector>
          );
        }}
      />
    </React.Fragment>
  );
}

function App({ pageTools, extra }: Props) {
  // webview.useOnBackPressed(() => {
  //   if (pageTools.splitter.state()) {
  //     pageTools.splitter.hide();
  //   } else {
  //     webview.close();
  //   }
  // });

  const renderToolbar = () => {
    return (
      <Toolbar>
        <div className="left">
          <ToolbarButton
            onClick={() => {
              pageTools.splitter.show();
            }}
          >
            <Icon icon={Menu} keepLight />
          </ToolbarButton>
        </div>
        <div className="center">Kartei</div>
      </Toolbar>
    );
  };

  const renderFixed = () => {
    return (
      <Material3.Fab
        position="bottom right"
        onClick={() => {
          pageTools.pushPage({
            component: AddActivity,
            props: {
              key: "add",
              extra: {},
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
      {!webview.isAndroid && (
        <Alert
          sx={{
            margin: "8px 8px 8px",
          }}
          severity="warning"
        >
          <AlertTitle>Warning</AlertTitle>
          Detected browser! Please remind that browsers only support <strong>5MB</strong> in their localStorage — don't
          save sensitive information in this application.
        </Alert>
      )}
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
        <CardRenderer pageTools={pageTools} extra={extra} />
      </React.Suspense>
    </Page>
  );
}

export { App };
