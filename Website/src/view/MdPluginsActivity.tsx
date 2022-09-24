import { DownloadRounded } from "@mui/icons-material";
import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { BackButton, List, ListItem, Page, ProgressCircular, Toolbar } from "react-onsenui";
import { Icon } from "../components/Icon";
import { ParserPlugin } from "../components/Markdown/rules";
import { useActivity } from "../components/RoutedApp";
import { StyledSection } from "../components/StyledSection";
import { useMdPlugins } from "../hooks/useMdPlugins";
import { os } from "../native/Os";

interface MDPlugins {
  id: string;
  name: string;
  description: string;
  cdn: string;
}

function SetBuilder(): JSX.Element {
  const [getSets, setSets] = React.useState<MDPlugins[]>([]);
  const [mdPlugins, setMdPlugins] = useMdPlugins();

  React.useEffect(() => {
    axios
      .get<MDPlugins[]>("https://raw.githubusercontent.com/DerGoogler/cdn/master/others/kartei/md-plugin/index.json")
      .then((response) => {
        setSets(response.data);
      });
  });

  const setDownloader = (url: string): void => {
    axios.get<ParserPlugin>(url).then((response) => {
      const data = response.data;
      setMdPlugins((tmp) => {
        if (tmp.some((elem) => elem?.id === data.id)) {
          os.toast("Dieses Plugin ist bereits vorhanden", "short");
        } else {
          tmp.push(data);
          os.toast(`Erfolgreich "${data.name}"  heruntergeladen`, "short");
        }
        return tmp;
      });
    });
  };

  return (
    <React.Fragment>
      {getSets.map((plugin) => (
        <>
          <ListItem
            tappable
            onClick={() => {
              setDownloader(plugin.cdn);
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

export function MdpluginsActivity() {
  const { context, extra } = useActivity();

  os.useOnBackPressed(context.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage}>Back</BackButton>
        </div>
        <div className="center">MD-Plugins</div>
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
