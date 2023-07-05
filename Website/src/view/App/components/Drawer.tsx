import { Divider, List, ListItemButton, ListSubheader } from "@mui/material";
import { Page } from "react-onsenui";
import { useStrings } from "../../../hooks/useStrings";
import { GroupsDownloadActivity } from "../../GroupsDownloadActivity";
import SettingsActivity from "../../SettingsActivity";
import { StyledListItemText } from "../../SettingsActivity/components/StyledListItemText";
import Acknowledgements from "./../../Acknowledgements";
import DescriptonActivity from "./../../DescriptonActivity";

type Props = {
  renderToolbar: () => JSX.Element;
  hideSplitter: () => void;
  pushPage: (props: PushPropsCore) => void;
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
            pushPage({
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
            pushPage({
              component: GroupsDownloadActivity,
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

      <List
        subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Other</ListSubheader>}
      >
        <ListItemButton
          onClick={() => {
            pushPage({
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
            pushPage({
              component: DescriptonActivity,
              props: {
                key: "license",
                extra: {
                  request: {
                    use: true,
                    url: "https://raw.githubusercontent.com/wiki/DerGoogler/LernKartei/License.md",
                  },
                  shortDesc: strings.license,
                },
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={strings.license} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: DescriptonActivity,
              props: {
                key: "changelog",
                extra: {
                  request: {
                    use: true,
                    url: "https://raw.githubusercontent.com/wiki/DerGoogler/LernKartei/Changelog.md",
                  },
                  shortDesc: "Changelog",
                },
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={"Changelog"} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: DescriptonActivity,
              props: {
                key: "privacy_policy",
                extra: {
                  request: {
                    use: true,
                    url: "https://raw.githubusercontent.com/wiki/DerGoogler/LernKartei/Privacy-Policy.md",
                  },
                  shortDesc: "Privacy Policy",
                },
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={"Privacy Policy"} />
        </ListItemButton>
      </List>
      <Divider />
    </Page>
  );
};
