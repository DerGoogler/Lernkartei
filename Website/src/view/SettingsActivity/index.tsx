import { ListHeader, Page, Toolbar } from "react-onsenui";
import { File } from "../../native/File";
import { os } from "../../native/Os";
import { useTheme } from "@mui/system";
import { useDarkmode } from "../../hooks/useDarkmode";
import { AccentColorPickerItem } from "./components/AccentColorPickerItem";
import { useConfirm } from "material-ui-confirm";
import { useActivity } from "../../hooks/useActivity";
import Material3 from "../../components/Material3";
import { useKartei } from "../../hooks/useKartei";
import { BackButton } from "../../components/BackButton";
import { useStrings } from "../../hooks/useStrings";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader, Switch } from "@mui/material";
import { StyledListItemText } from "./components/StyledListItemText";
import { BuildConfig } from "@Native/BuildConfig";

function SettingsActivity() {
  const confirm = useConfirm();
  const { context, extra } = useActivity();
  const { strings, language, setLanguage } = useStrings();

  os.useOnBackPressed(context.popPage);

  const theme = useTheme();

  // Prefs
  const { darkmode, setDarkmode } = useDarkmode();
  const { cards, setCards } = useKartei();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">{strings.settings}</div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Aussehen</ListSubheader>
        }
      >
        <ListItem>
          <StyledListItemText
            id="switch-list-label-wifi"
            primary={strings.dark_mode.title}
            secondary={strings.dark_mode.sub_title}
          />
          <Switch
            edge="end"
            onChange={(e: any) => {
              setDarkmode(e.target.checked);
            }}
            checked={darkmode}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
          />
        </ListItem>
        <AccentColorPickerItem />
        <ListItem>
          <StyledListItemText id="sts-language" primary={strings.language} />
          <FormControl>
            <NativeSelect
              variant="outlined"
              defaultValue={language}
              inputProps={{
                name: "lang",
                "aria-labelledby": "sts-language",
              }}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            >
              <option value="de">German</option>
              <option value="en">English</option>
            </NativeSelect>
          </FormControl>
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>
            {strings["karten/groups"]}
          </ListSubheader>
        }
      >
        <ListItemButton
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
          <StyledListItemText
            id="switch-list-label-wifi"
            primary="Backup"
            secondary="Alle Gruppen und Karten in einer Datei sichern"
          />
        </ListItemButton>
        {/* <ImportGroupsItem />  */}
      </List>

      <Divider />

      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>
            {strings.development}
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => {
            os.open("https://github.com/DerGoogler/Lernkartei/issues", {
              target: "_blank",
              features: {
                color: theme.palette.primary.main,
              },
            });
          }}
        >
          <StyledListItemText id="switch-list-label-wifi" primary="Issues" secondary="Track our issues" />
        </ListItemButton>
      </List>

      <Divider />

      <ListItem>
        <StyledListItemText
          primary={`${BuildConfig.APPLICATION_ID} ${BuildConfig.VERSION_NAME} (${BuildConfig.VERSION_CODE})`}
        />
      </ListItem>
    </Page>
  );
}

export default SettingsActivity;
