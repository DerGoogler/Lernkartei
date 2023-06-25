import { ListHeader, Page, Toolbar } from "react-onsenui";
import { File } from "../../native/File";
import { os } from "../../native/Os";
import { useTheme } from "@mui/system";
import { useSettings } from "../../hooks/useSettings";
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
import { ImportGroupsItem } from "./components/ImportGroupsItem";
import { ImportSingleGroupsItem } from "./components/ImportSingleGroupsItem";
import { useNativeStorage } from "@Hooks/useNativeStorage";

function AceSettings() {
  const { context } = useActivity();
  const { strings } = useStrings();

  os.useOnBackPressed(context.popPage);

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
