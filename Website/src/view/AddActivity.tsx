import { TextField } from "@mui/material";
import ons from "onsenui";
import * as React from "react";
import { BackButton, Button, Input, Page, Toolbar } from "react-onsenui";
import AlertDialog from "../buildrs/AlertDialog";
import webview from "../native/WebView";

interface Props extends PushProps<{}> {}

function AddActivity({ pageTools, extra }: Props) {
  const [group, setGroup] = React.useState("lernfeld_1");
  const [name, setName] = React.useState("Lernfeld 1");
  const [description, setDescription] = React.useState("Güter annehmen und kontrolieren");

  webview.useOnBackPressed(pageTools.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar>
        <div className="left">
          <BackButton onClick={pageTools.popPage}>Back</BackButton>
        </div>
        <div className="center">Neue Gruppe</div>
      </Toolbar>
    );
  };

  const validGroup = (group: string): boolean => {
    return /^\w+$/.test(group);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(e.target.value.toLowerCase());
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    const getBefore = webview.pref.getJSON<Array<Kartei>>("katei", []);

    try {
      const obj: Kartei = {
        group: group,
        name: name,
        description: description,
        karten: [],
      };

      if (!validGroup(group)) {
        ons.notification.alert("Bitte achte drauf, dass keine Leerzeichen verwendet werden, oder bindestriche");
      } else {
        if (getBefore.some((elem) => elem?.group === group)) {
          ons.notification.alert("Diese Gruppe is bereits vorhanden.");
        } else {
          webview.pref.setJSON<Partial<Array<Kartei>>>("katei", [
            ...webview.pref.getJSON<Partial<Array<Kartei>>>("katei", []),
            obj,
          ]);
          pageTools.popPage();
          webview.toast(`Deine Gruppe (${name}) wurde gespeichert.`, "short");
        }
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <section style={{ padding: 8 }}>
        <span>
          <TextField
            fullWidth
            // margin="dense"
            type="text"
            label="Gruppe"
            value={group}
            variant="outlined"
            onChange={handleGroupChange}
          />
        </span>
        <span>
          <TextField
            fullWidth
            margin="dense"
            type="text"
            label="Name"
            value={name}
            variant="outlined"
            onChange={handleNameChange}
          />
        </span>
        <span>
          <TextField
            fullWidth
            margin="dense"
            type="text"
            label="Beschreibung"
            value={description}
            variant="outlined"
            onChange={handleDescriptionChange}
          />
        </span>
        <Button style={{ marginTop: 8 }} modifier="large" onClick={handleSave}>
          Speichern
        </Button>
      </section>
    </Page>
  );
}

export default AddActivity;
