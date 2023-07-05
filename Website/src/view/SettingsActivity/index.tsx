import { Page } from "react-onsenui";
import { File } from "../../native/File";
import { os } from "../../native/Os";
import { useTheme } from "@mui/system";
import { accent_colors, useSettings } from "../../hooks/useSettings";
import { useActivity } from "../../hooks/useActivity";
import { useKartei } from "../../hooks/useKartei";
import { useStrings } from "../../hooks/useStrings";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListSubheader, Switch } from "@mui/material";
import { StyledListItemText } from "./components/StyledListItemText";
import { BuildConfig } from "@Native/BuildConfig";
import { ImportGroupsItem } from "./components/ImportGroupsItem";
import { ImportSingleGroupsItem } from "./components/ImportSingleGroupsItem";
import { Icon } from "@Components/Icon";
import AceSettings from "./AceSettings";
import { PickerItem } from "./components/PickerItem";
import { languages_map } from "./../../locales/languages";
import DangerEditActivity from "../DangerEditActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SettingsActivity() {
  const { context } = useActivity();
  const { strings } = useStrings();

  const theme = useTheme();

  // Prefs
  const { settings, setSettings } = useSettings();
  const { cards } = useKartei();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings.settings}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>
            {strings.appierence}
          </ListSubheader>
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
              setSettings({ darkmode: e.target.checked });
            }}
            checked={settings.darkmode}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
          />
        </ListItem>
        <PickerItem
          id="accent-color"
          targetSetting="accent_scheme"
          title={strings.accent_colors}
          contentMap={accent_colors}
        />
        <PickerItem id="language" targetSetting="language" title={strings.language} contentMap={languages_map} />
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
            const file = new File(`karten.${Math.floor(Math.random() * 5000000)}.json`);

            try {
              file.createJSON(cards, 4);
              os.toast("Kartei karten erfolgreich exportiert", "short");
            } catch (e) {
              os.toast((e as Error).message, "short");
            }
          }}
        >
          <StyledListItemText
            id="switch-list-label-wifi"
            primary="Backup"
            secondary={strings.backup_settings_subtext}
          />
        </ListItemButton>
        <ImportGroupsItem />
        <ImportSingleGroupsItem />
      </List>

      <Divider />

      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Editor</ListSubheader>
        }
      >
        <ListItem>
          <StyledListItemText id="beta-editor" primary="Ace editor" secondary="Customizeable textarea" />
          <ListItemIcon
            onClick={() => {
              context.pushPage({
                component: AceSettings,
                props: {
                  key: "ace-settings",
                  extra: {},
                },
              });
            }}
          >
            <Icon icon={SettingsIcon} />
          </ListItemIcon>
          <Switch
            edge="end"
            onChange={(e) => {
              setSettings({ __ace_settings_enabled: e.target.checked });
            }}
            checked={settings.__ace_settings_enabled}
            inputProps={{
              "aria-labelledby": "beta-editor",
            }}
          />
        </ListItem>
      </List>
      <Divider />

      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>
            {strings.development}
          </ListSubheader>
        }
      >
        <ListItem>
          <StyledListItemText
            onClick={() => {
              context.pushPage({
                component: DangerEditActivity,
                props: {
                  key: "danger-edit",
                  extra: {},
                },
              });
            }}
            primary="Dangerus Card Editor"
          />
        </ListItem>
        <ListItem>
          <StyledListItemText
            id="switch-list-label-eruda"
            primary={"Eruda console"}
            secondary={"Useful for development and bugs"}
          />
          <Switch
            edge="end"
            onChange={(e: any) => {
              setSettings({ eruda_console_enabled: e.target.checked });
            }}
            checked={settings.eruda_console_enabled}
            inputProps={{
              "aria-labelledby": "switch-list-label-eruda",
            }}
          />
        </ListItem>
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
