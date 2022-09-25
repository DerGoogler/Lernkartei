import { DownloadRounded } from "@mui/icons-material";
import axios from "axios";
import * as React from "react";
import { BackButton, List, ListHeader, ListItem, Page, ProgressCircular, Toolbar } from "react-onsenui";
import { Icon } from "../components/Icon";
import { useActivity } from "../hooks/useActivity";
import { useKartei } from "../hooks/useKartei";
import { os } from "../native/Os";

function SetBuilder(): JSX.Element {
  const [getSets, setSets] = React.useState<Array<KarteiSetRoot>>([]);
  const [cards, setCards] = useKartei();

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
      setCards((tmp) => {
        if (tmp.some((elem) => elem?.group === data.group)) {
          os.toast("Diese Gruppe ist bereits vorhanden", "short");
        } else {
          tmp.push(data);
          os.toast(`Erfolgreich "${data.name}" heruntergeladen`, "short");
        }
        return tmp;
      });
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

function GroupsActivity() {
  const { context, extra } = useActivity();

  os.useOnBackPressed(context.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage}>Back</BackButton>
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
