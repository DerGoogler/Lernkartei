import { Divider, List, ListSubheader } from "@mui/material";
import * as React from "react";
import { ProgressCircular } from "react-onsenui";
import { useFetch } from "usehooks-ts";
import { useActivity } from "../../hooks/useActivity";
import { useKartei } from "../../hooks/useKartei";
import { useStrings } from "../../hooks/useStrings";
import { Group } from "./components/Group";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Page } from "@Components/onsenui/Page";

function GroupsDownloadActivity() {
  const { context, extra } = useActivity();
  const { strings } = useStrings();
  const { cards, actions } = useKartei();

  const { data } = useFetch<KarteiSetRoot[]>(
    "https://raw.githubusercontent.com/DerGoogler/cdn/master/others/kartei/index/sets.json"
  );

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings.groups}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      {!data ? (
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
      ) : (
        <>
          {data.map((group) => (
            <>
              <List
                subheader={
                  <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>
                    {group.name}
                  </ListSubheader>
                }
              >
                {group.sets.map((set, index) => (
                  <Group key={String(set.name + index * 5)} cards={cards} actions={actions} set={set} />
                ))}
              </List>
              <Divider />
            </>
          ))}
        </>
      )}
    </Page>
  );
}

export { GroupsDownloadActivity };
