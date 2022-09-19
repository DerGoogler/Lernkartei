import { Edit } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import { ToolbarButton } from "react-onsenui";
import { Icon } from "../../../components/Icon";
import { useJSON } from "../../../native/SharedPreferences";

type GroupEditProps = PushProps<any> & {
  name: string;
  desc: string;
};

export function GroupEdit({ pageTools, extra, name, desc }: GroupEditProps) {
  const [show, setShow] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDesc, setEditDesc] = useState(desc);
  const [cards, setCards] = useJSON<Kartei[]>("katei", []);

  const handleGroupNameEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleGroupDescEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDesc(e.target.value);
  };

  const showAlertDialog = () => {
    setShow(true);
  };
  const hideAlertDialog = () => {
    setShow(false);
  };

  const saveEdit = () => {
    const { card, index } = extra;

    let groups = cards;
    groups[index].name = editName;
    groups[index].description = editDesc;
    setCards(groups);
    hideAlertDialog();
    pageTools.popPage();
  };

  return (
    <Fragment>
      <ToolbarButton onClick={showAlertDialog}>
        <Icon icon={Edit} keepLight />
      </ToolbarButton>
      <Dialog open={show} onClose={hideAlertDialog}>
        <DialogTitle>Gruppe bearbeiten</DialogTitle>
        <DialogContent>
          <DialogContentText>Hier kannst Du deine Gruppe nachträglich bearbeiten</DialogContentText>
          <TextField
            fullWidth
            margin="dense"
            type="text"
            label="Name"
            value={editName}
            variant="outlined"
            onChange={handleGroupNameEdit}
          />
          <TextField
            fullWidth
            margin="dense"
            type="text"
            label="Beschreibung"
            value={editDesc}
            variant="outlined"
            onChange={handleGroupDescEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideAlertDialog}>Abbrechen</Button>
          <Button onClick={saveEdit}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
