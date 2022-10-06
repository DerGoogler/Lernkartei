import { Divider, List, ListItemButton, ListSubheader } from "@mui/material";
import { Page } from "react-onsenui";
import { useStrings } from "../../../hooks/useStrings";
import Acknowledgements from "../../Acknowledgements";
import { GroupsActivity } from "../../GroupsActivity";
import SettingsActivity from "../../SettingsActivity";
import { StyledListItemText } from "../../SettingsActivity/components/StyledListItemText";

type Props = {
  renderToolbar: () => JSX.Element;
  hideSplitter: () => void;
  pushPage: <T>(props: PushPropsCore<T>) => void;
};

export const Drawer = (props: Props) => {
  const hide = props.hideSplitter;
  const pushPage = props.pushPage;

  const { strings } = useStrings();

  return (
    <Page renderToolbar={props.renderToolbar}>
      <List
        subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>App</ListSubheader>}
      >
        <ListItemButton
          onClick={() => {
            pushPage<{}>({
              component: Acknowledgements,
              props: {
                key: "acknowledgements",
                extra: {},
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary="Acknowledgements" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage<{}>({
              component: SettingsActivity,
              props: {
                key: "settings",
                extra: {},
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={strings.settings} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage<{}>({
              component: GroupsActivity,
              props: {
                key: "sets",
                extra: {},
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={strings.groups} />
        </ListItemButton>
      </List>
      <Divider />
    </Page>
  );
};
