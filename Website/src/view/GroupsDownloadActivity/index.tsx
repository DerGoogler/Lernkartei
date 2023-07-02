import { Divider, List, ListSubheader } from "@mui/material";
import * as React from "react";
import { Page, ProgressCircular, Toolbar } from "react-onsenui";
import { useFetch } from "usehooks-ts";
import { BackButton } from "../../components/BackButton";
import { useActivity } from "../../hooks/useActivity";
import { useKartei } from "../../hooks/useKartei";
import { useStrings } from "../../hooks/useStrings";
import { os } from "../../native/Os";
import { Group } from "./components/Group";

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
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">{strings.groups}</div>
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
