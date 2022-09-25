import { BackButton, ListHeader, ListItem, Page, Toolbar } from "react-onsenui";
import { File } from "../../native/File";
import { os } from "../../native/Os";
import { useKartei } from "../../hooks/useKartei";
import { useTheme } from "@mui/system";
import { useDarkmode } from "../../hooks/useDarkmode";
import { AccentColorPickerItem } from "./components/AccentColorPickerItem";
import { useConfirm } from "material-ui-confirm";
import { useKPlugin, useMdPlugin } from "../../plugin/kplugin";
import { useActivity } from "../../hooks/useActivity";

function SettingsActivity() {
  const confirm = useConfirm();
  const { context, extra, settings } = useActivity();
  const [mdplugin, setMdPlugin] = useMdPlugin();
  const [kplugins, setKPlugin] = useKPlugin();

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
      <ListHeader>Plugins</ListHeader>
      <ListItem
        tappable
        modifier="chevron"
        onClick={() => {
          confirm({
            title: "Delete plugins?",
            description: "All plugins will be deleted",
          })
            .then(() => {
              setKPlugin([]);
            })
            .catch(() => {
              /* ... */
            });
        }}
      >
        <div className="center">
          <span className="list-item__title">Remove All Plugins</span>
          <span className="list-item__subtitle">Removes all plugins from this device</span>
        </div>
      </ListItem>
      <ListItem
        tappable
        modifier="chevron"
        onClick={() => {
          confirm({
            title: "Delete rules?",
            description: "All rules will be deleted",
          })
            .then(() => {
              setMdPlugin([]);
            })
            .catch(() => {
              /* ... */
            });
        }}
      >
        <div className="center">
          <span className="list-item__title">Remove All Md-Rules</span>
          <span className="list-item__subtitle">This action is useless when the current plugin is saved</span>
        </div>
      </ListItem>
    </Page>
  );
}

export default SettingsActivity;
