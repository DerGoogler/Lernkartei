import { BackButton, ListHeader, ListItem, Page, Toolbar } from "react-onsenui";
import { ConfirmationDialogRaw } from "../components/ConfirmationDialogRaw";
import React from "react";
import Material3 from "../components/Material3";
import { File } from "../native/File";
import { sharedpreferences, useBoolean, useJSON } from "../native/SharedPreferences";
import { Environment } from "../native/Environment";
import { useConfirm } from "material-ui-confirm";
import { os } from "../native/Os";
import { AccentColors, accent_colors, default_scheme } from "../theme";

interface Props extends PushProps<{}> {}

function SettingsActivity({ pageTools }: Props) {
  const confirm = useConfirm();
  os.useOnBackPressed(pageTools.popPage);

  // Prefs
  const [darkmode, setDarkmode] = useBoolean("darkmode", false);
  const [cards, setCards] = useJSON("katei", []);

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
          const Env = new Environment();
          if (!Env.hasStoragePermission()) {
            confirm({
              title: "Speicher berechtigung fehlt",
              description: "Es wird der Zugriff auf den Speicher benötigt.",
              confirmationText: "Allow",
              cancellationText: "Disallow",
            }).then(() => {
              Env.requestStoargePermission();
            });
          }

          const file = new File("karten.json");
          if (file.exists()) {
            os.toast(
              "Es exestiert bereits ein Backup deiner Karten! Lösche das alte Backup um ein neues zu erstellen.",
              "short"
            );
          } else {
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
  const [value, setValue] = React.useState<AccentColors[0]>(default_scheme);
  const [scheme, setScheme] = useJSON<AccentColors[0]>("accent_scheme", default_scheme);

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
