import { BackButton, ListHeader, ListItem, Page, Toolbar } from "react-onsenui";
import { File } from "../../native/File";
import { os } from "../../native/Os";
import { useTheme } from "@mui/system";
import { useDarkmode } from "../../hooks/useDarkmode";
import { AccentColorPickerItem } from "./components/AccentColorPickerItem";
import { useConfirm } from "material-ui-confirm";
import { useActivity } from "../../hooks/useActivity";
import Material3 from "../../components/Material3";

function SettingsActivity() {
  const confirm = useConfirm();
  const { context, extra, settings } = useActivity();

  os.useOnBackPressed(context.popPage);

  const theme = useTheme();

  // Prefs
  const [darkmode, setDarkmode] = settings.useDarkmode();
  const [cards, setCards] = settings.useKartei();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage}>Back</BackButton>
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
            checked={darkmode}
            onChange={(e: any) => {
              setDarkmode(e.target.checked);
            }}
          ></Material3.Switch>
        </div>
      </ListItem>
      {/* {!darkmode && <AccentColorPickerItem />} */}
      <AccentColorPickerItem />

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
      {/* <ImportGroupsItem /> */}

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

export default SettingsActivity;
