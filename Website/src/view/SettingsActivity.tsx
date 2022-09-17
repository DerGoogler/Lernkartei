import { BackButton, ListHeader, ListItem, Page, Toolbar } from "react-onsenui";
import saveAs from "file-saver";
import webview from "../native/WebView";
import { ConfirmationDialogRaw } from "../components/ConfirmationDialogRaw";
import React from "react";
import { accent_colors, default_scheme, IsDarkmode } from "../theme";
import Material3 from "../components/Material3";

interface Props extends PushProps<{}> {}

function SettingsActivity({ pageTools }: Props) {
  webview.useOnBackPressed(pageTools.popPage);

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
      <ListItem>
        <div className="center">
          <span className="list-item__title">Dunkler Modus (Beta)</span>
          <span className="list-item__subtitle">Design könnte nicht auf dem neuesten stand sein</span>
        </div>
        <div className="right">
          <Material3.Switch
            checked={webview.pref.getBoolean("darkmode", false)}
            onChange={(e: any) => {
              webview.pref.setBoolean("darkmode", e.target.checked);
            }}
          ></Material3.Switch>
        </div>
      </ListItem>
      {!IsDarkmode && <AccentColorPickerItem />}

      <ListHeader>Karten / Gruppen</ListHeader>
      <ListItem
        tappable
        disabled
        onClick={() => {
          const blob_ = new Blob([JSON.stringify(webview.pref.getJSON<Array<Kartei>>("katei", []), null, 4)], {
            type: "text/plain;charset=utf-8",
          });
          saveAs(blob_, "karten.json");
        }}
      >
        <div className="center">
          <span className="list-item__title">Backup (Diabled)</span>
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
          webview.open("https://github.com/DerGoogler/Lernkartei/issues", "_blank");
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
  const [value, setValue] = React.useState<typeof accent_colors[0]>(default_scheme);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (val: any) => {
    setOpen(false);

    if (val.name && val.value) {
      setValue(val);
      webview.pref.setJSON<typeof accent_colors>("accent_scheme", val);
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
