import { DownloadRounded } from "@mui/icons-material";
import { Divider, List, ListItemButton, ListSubheader } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { ListHeader, ListItem, Page, ProgressCircular, Toolbar } from "react-onsenui";
import { useFetch } from "usehooks-ts";
import { BackButton } from "../components/BackButton";
import { Icon } from "../components/Icon";
import { useActivity } from "../hooks/useActivity";
import { useKartei } from "../hooks/useKartei";
import { useStrings } from "../hooks/useStrings";
import { os } from "../native/Os";
import { StyledListItemText } from "./SettingsActivity/components/StyledListItemText";

function SetBuilder(): JSX.Element {
  const { setCards, actions } = useKartei();
  const { strings } = useStrings();

  const { data } = useFetch<KarteiSetRoot[]>(
    "https://raw.githubusercontent.com/DerGoogler/cdn/master/others/kartei/index/sets.json"
  );

  const setDownloader = (url: string): void => {
    axios.get<Kartei>(url).then((response) => {
      const data = response.data;
      actions.addGroup({
        group: data.group,
        data: data,
        onExists: () => {
          os.toast(strings.group_exist, "short");
        },
        callback: () => {
          os.toast(
            strings.formatString(strings.group_downloaded, {
              name: data.name,
            }) as string,
            "short"
          );
        },
      });
    });
  };

  return (
    <React.Fragment>
      {data?.map((group) => (
        <>
          <List
            subheader={
              <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>
                {strings["karten/groups"]}
              </ListSubheader>
            }
          >
            {group.sets.map((set) => (
              <ListItemButton
                onClick={() => {
                  setDownloader(set.cdn);
                }}
              >
                <StyledListItemText primary={set.name} secondary={set.desc} />
                <DownloadRounded />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </>
      ))}
    </React.Fragment>
  );
}

function GroupsActivity() {
  const { context, extra } = useActivity();
  const { strings } = useStrings();

  os.useOnBackPressed(context.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">{strings.groups}</div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <React.Suspense
        fallback={
          <ProgressCircular
            indeterminate
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              WebkitTransform: "translate(-50%, -50%)",
              transform: "translate(-50%, -50%)",
            }}
          />
        }
      >
        <List>
          <SetBuilder />
        </List>
      </React.Suspense>
    </Page>
  );
}

export { GroupsActivity };
