import { DownloadRounded } from "@mui/icons-material";
import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { BackButton, List, ListItem, Page, ProgressCircular, Toolbar } from "react-onsenui";
import { Icon } from "../components/Icon";
import { StyledSection } from "../components/StyledSection";
import { useActivity } from "../hooks/useActivity";
import { os } from "../native/Os";
import { KPlugin, useKPlugin } from "../plugin/kplugin";

function SetBuilder(): JSX.Element {
  const [plugins, setPlugins] = React.useState<KPlugin.Request[]>([]);
  const [kPlugins, setKPlugins] = useKPlugin();

  React.useEffect(() => {
    axios
      .get<KPlugin.Request[]>(
        "https://raw.githubusercontent.com/DerGoogler/cdn/master/others/kartei/md-plugin/index.json"
      )
      .then((response) => {
        setPlugins(response.data);
      });
  });

  const setDownloader = (id: string, url: string): void => {
    axios.get<string>(url).then((response) => {
      const data = response.data;
      setKPlugins((tmp) => {
        if (tmp.some((elem) => elem?.id === id)) {
          os.toast("Dieses Plugin ist bereits vorhanden", "short");
        } else {
          tmp.push({
            id: id,
            exec: data,
          });
          os.toast(`Erfolgreich "${id}"  heruntergeladen`, "short");
        }
        return tmp;
      });
    });
  };

  return (
    <React.Fragment>
      {plugins.map((plugin) => (
        <>
          <ListItem
            tappable
            onClick={() => {
              setDownloader(plugin.id, plugin.plugin);
            }}
          >
            <div className="center">
              <span className="list-item__title">{plugin.name}</span>
              <span className="list-item__subtitle">{plugin.description}</span>
            </div>
            <div className="right">
              <Icon icon={DownloadRounded} />
            </div>
          </ListItem>
        </>
      ))}
    </React.Fragment>
  );
}

export function KPluginsActivity() {
  const { context, extra } = useActivity();

  os.useOnBackPressed(context.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage}>Back</BackButton>
        </div>
        <div className="center">KPlugins</div>
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
        <StyledSection>
          <Alert severity="error">
            <AlertTitle>Achtung!</AlertTitle>
            Diese Funktion ist noch nicht komplett ausgereift — <strong>benutzung auf eigende Gefahr!</strong>
          </Alert>
        </StyledSection>
        <List>
          <SetBuilder />
        </List>
      </React.Suspense>
    </Page>
  );
}
