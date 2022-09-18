import { DownloadRounded } from "@mui/icons-material";
import axios from "axios";
import { rct } from "googlers-tools";
import * as React from "react";
import { BackButton, List, ListHeader, ListItem, Page, ProgressCircular, Toolbar } from "react-onsenui";
import { Icon } from "../components/Icon";
import { os } from "../native/Os";
import { sharedpreferences } from "../native/SharedPreferences";

interface Props extends PushProps {}

function SetBuilder(): JSX.Element {
  const [getSets, setSets] = rct.useState<Array<KarteiSetRoot>>([]);

  React.useEffect(() => {
    axios
      .get("https://raw.githubusercontent.com/DerGoogler/cdn/master/others/kartei/index/sets.json")
      .then((response) => {
        setSets(response.data);
      });
  });

  const setDownloader = (url: string): void => {
    axios.get<Kartei>(url).then((response) => {
      const data = response.data;
      let tmp = [];
      tmp = sharedpreferences.getJSON<Array<Kartei>>("katei", []);

      if (tmp.some((elem) => elem?.group === data.group)) {
        os.toast("Diese Gruppe ist bereits vorhanden", "short");
      } else {
        tmp.push(data);
        sharedpreferences.setJSON<Array<Kartei>>("katei", tmp);
        os.toast(`Erfolgreich heruntergeladen`, "short");
      }
    });
  };

  return (
    <React.Fragment>
      {getSets.map((group) => (
        <>
          <ListHeader>{group.name}</ListHeader>
          {group.sets.map((set) => (
            <ListItem
              tappable
              onClick={() => {
                setDownloader(set.cdn);
              }}
            >
              <div className="center">
                <span className="list-item__title">{set.name}</span>
                <span className="list-item__subtitle">{set.desc}</span>
              </div>
              <div className="right">
                <Icon icon={DownloadRounded} />
              </div>
            </ListItem>
          ))}
        </>
      ))}
    </React.Fragment>
  );
}

function GroupsActivity({ pageTools }: Props) {
  os.useOnBackPressed(pageTools.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar>
        <div className="left">
          <BackButton onClick={pageTools.popPage}>Back</BackButton>
        </div>
        <div className="center">Gruppen</div>
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
