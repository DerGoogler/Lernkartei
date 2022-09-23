import { BackButton, ListHeader, ListItem, Page, Toolbar } from "react-onsenui";
import { ConfirmationDialogRaw } from "../components/ConfirmationDialogRaw";
import React from "react";
import { File } from "../native/File";
import { useBoolean, useJSON } from "../native/SharedPreferences";
import { useConfirm } from "material-ui-confirm";
import { os } from "../native/Os";
import { AccentColors, accent_colors, default_scheme } from "../theme";
import { useKartei } from "../hooks/useKartei";
import { useTheme } from "@mui/system";
import { useScheme } from "../hooks/useScheme";
import { useDarkmode } from "../hooks/useDarkmode";

interface Props extends PushProps<{}> {}

function SettingsActivity({ pageTools }: Props) {
  const confirm = useConfirm();
  os.useOnBackPressed(pageTools.popPage);

  const theme = useTheme();

  // Prefs
  const [darkmode, setDarkmode] = useDarkmode();
  const [cards, setCards] = useKartei();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={pageTools.popPage}>Back</BackButton>
        </div>
        <div className="center">Einstellungen</div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <ListHeader>Aussehen</ListHeader>
      {/* <ListItem>
        <div className="center">
          <span className="list-item__title">Dunkler Modus (Beta)</span>
          <span className="list-item__subtitle">Design könnte nicht auf dem neuesten stand sein</span>
        </div>
        <div className="right">
          <Material3.Switch
            checked={darkmode}
            onChange={(e: any) => {
              setDarkmode(e.target.checked);
            }}
          ></Material3.Switch>
        </div>
      </ListItem> */}
      {!darkmode && <AccentColorPickerItem />}

      <ListHeader>Karten / Gruppen</ListHeader>
      <ListItem
        tappable
        onClick={() => {
          if (os.isAndroid) {
            os.open("http://localhost:4765/cards.json", {
              target: "_blank",
              features: {
                color: theme.palette.primary.main,
              },
            });
          } else {
            const file = new File("karten.json");
            file.createJSON(cards, 4);
          }
        }}
      >
        <div className="center">
          <span className="list-item__title">Backup</span>
          <span className="list-item__subtitle">Alle Gruppen und Karten in einer Datei sichern</span>
        </div>
      </ListItem>
      <ListItem style={{ display: "none" }}>
        <div className="center">
          <span className="list-item__title">Wiederherstellen</span>
          <span className="list-item__subtitle">Alle Gruppen und Karten wiederherstellen</span>
        </div>
      </ListItem>

      <ListHeader>Development</ListHeader>
      <ListItem
        tappable
        modifier="chevron"
        onClick={() => {
          os.open("https://github.com/DerGoogler/Lernkartei/issues", {
            target: "_blank",
            features: {
              color: theme.palette.primary.main,
            },
          });
        }}
      >
        <div className="center">
          <span className="list-item__title">Issues</span>
          <span className="list-item__subtitle">Track our issues</span>
        </div>
      </ListItem>
    </Page>
  );
}

function AccentColorPickerItem() {
  const [open, setOpen] = React.useState(false);
  const [scheme, setScheme] = useScheme();
  const [value, setValue] = React.useState<AccentColors[0]>(scheme);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (val: any) => {
    setOpen(false);

    if (val.name && val.value) {
      setValue(val);
      setScheme(val);
    }
  };

  return (
    <>
      <ListItem onClick={handleOpen}>
        <div className="center">
          <span className="list-item__title">Akzentfarbe</span>
          <span className="list-item__subtitle">{value.name}</span>
        </div>
      </ListItem>
      <ConfirmationDialogRaw
        id="accent-menu"
        title="Farbakzent auswählen"
        keepMounted
        open={open}
        contentMap={accent_colors}
        onClose={handleClose}
        value={value}
      />
    </>
  );
}

export default SettingsActivity;
