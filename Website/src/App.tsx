import * as React from "react";
import { GestureDetector, List, Page, ProgressCircular, Toolbar, ToolbarButton } from "react-onsenui";
import { Icon } from "./components/Icon";
import { Add, DeleteRounded, EditRounded, Menu } from "@mui/icons-material";
import AddActivity from "./view/AddActivity";
import CardActivity from "./view/CardActivity";
import AlertDialog from "./buildrs/AlertDialog";
import Material3 from "./components/Material3";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Ripple } from "react-onsenui";
import { ArrayMap } from "./components/ArrayMap";
import { isMobile } from "react-device-detect";
import { BuildConfig } from "./native/BuildConfig";
import { Environment } from "./native/Environment";
import { sharedpreferences } from "./native/SharedPreferences";
import { os } from "./native/Os";
import { useConfirm } from "material-ui-confirm";

interface Props extends PushProps<{}> {}

export const StyledCard = styled(Paper)(({ theme }) => ({
  margin: 8,
  "&.MuiPaper-root": {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  display: "inline-flex",
  MozBoxAlign: "center",
  alignItems: "center",
  MozBoxPack: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: "currentcolor none 0px",
  margin: "0px",
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  appearance: "none",
  textDecoration: "none",
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: "1.5rem",
  padding: "8px",
  overflow: "visible",
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  border: "1px solid rgb(238, 238, 238)",
  borderTopColor: "rgb(238, 238, 238)",
  borderRightColor: "rgb(238, 238, 238)",
  borderBottomColor: "rgb(238, 238, 238)",
  borderLeftColor: "rgb(238, 238, 238)",
  color: "rgb(66, 66, 66)",
  borderRadius: theme.shape.borderRadius,
  alignSelf: "flex-start",
  ":hover": {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

function CardRenderer({ pageTools, extra }: Props) {
  const getCards = sharedpreferences.getJSON<Array<Kartei>>("katei", []);

  const confirm = useConfirm();

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
            <StyledCard elevation={0}>
              <Box sx={{ p: 2, display: "flex" }}>
                <Stack
                  spacing={0.5}
                  style={{ flexGrow: 1 }}
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
                  <Typography fontWeight={700}>{card.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </Stack>
                <StyledIconButton
                  style={{ width: 30, height: 30 }}
                  onClick={() => {
                    confirm({
                      title: "Löschen",
                      description: (
                        <span>
                          Möchtest Du die <strong>{card.name}</strong>-Gruppe löschen?
                        </span>
                      ),
                      confirmationText: "Ja",
                      cancellationText: "Nein",
                    })
                      .then(() => {
                        let tmp = [];
                        try {
                          tmp = sharedpreferences.getJSON<Kartei[]>("katei", []);
                          sharedpreferences.setJSON<Kartei[]>(
                            "katei",
                            tmp.filter((remv) => remv.group != card.group)
                          );
                          os.toast(`${card.name} wurde gelöscht.`, "short");
                        } catch (error) {
                          os.toast((error as Error).message, "short");
                        }
                      })
                      .catch(() => {});
                  }}
                >
                  <DeleteRounded sx={{ fontSize: 14 }} />
                </StyledIconButton>
              </Box>
              <Divider />
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
                <Chip
                  size="small"
                  label={
                    card.karten.length != 0 && card.karten.length <= 2
                      ? `${card.karten.length} Karte`
                      : `${card.karten.length} Karten`
                  }
                />
              </Stack>
            </StyledCard>
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
      <Toolbar modifier="noshadow">
        <div className="left">
          <ToolbarButton
            onClick={() => {
              pageTools.splitter.show();
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
      {!os.isAndroid && (
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
