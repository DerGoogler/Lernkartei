import { Page, Toolbar } from "react-onsenui";
import { useTheme } from "@mui/system";
import { useSettings } from "../../hooks/useSettings";
import { useActivity } from "../../hooks/useActivity";
import { BackButton } from "../../components/BackButton";
import { useStrings } from "../../hooks/useStrings";
import { List, ListItem, ListSubheader, Switch } from "@mui/material";
import { StyledListItemText } from "./components/StyledListItemText";

function AceSettings() {
  const { context } = useActivity();
  const { strings } = useStrings();

  const theme = useTheme();

  // Prefs
  const { settings, setSettings } = useSettings();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">Ace Settings</div>
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
          <StyledListItemText id="show-line-numbers" primary={"Show Line Numbers"} />
          <Switch
            edge="end"
            onChange={(e: any) => {
              setSettings({
                __ace_settings_show_line_numbers: e.target.checked,
              });
            }}
            checked={settings.__ace_settings_show_line_numbers}
            inputProps={{
              "aria-labelledby": "show-line-numbers",
            }}
          />
        </ListItem>
        <ListItem>
          <StyledListItemText id="show-gutter" primary={"Show Gutter"} />
          <Switch
            edge="end"
            onChange={(e: any) => {
              setSettings({
                __ace_settings_show_gutter: e.target.checked,
              });
            }}
            checked={settings.__ace_settings_show_gutter}
            inputProps={{
              "aria-labelledby": "show-gutter",
            }}
          />
        </ListItem>
        <ListItem>
          <StyledListItemText id="highlight-active-line" primary={"Highlight Active Line"} />
          <Switch
            edge="end"
            onChange={(e: any) => {
              setSettings({
                __ace_settings_highlight_active_line: e.target.checked,
              });
            }}
            checked={settings.__ace_settings_highlight_active_line}
            inputProps={{
              "aria-labelledby": "highlight-active-line",
            }}
          />
        </ListItem>
      </List>
    </Page>
  );
}

export default AceSettings;
