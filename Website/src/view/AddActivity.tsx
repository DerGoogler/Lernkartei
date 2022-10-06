import { Button, TextField } from "@mui/material";
import * as React from "react";
import { BackButton, Page, Toolbar } from "react-onsenui";
import { os } from "../native/Os";
import { useKartei } from "../hooks/useKartei";
import { useActivity } from "../hooks/useActivity";
import { ToolbarButton } from "../components/ToolbarButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Extra = {
  name: string;
  description: string;
  editGroup: boolean;
  index: number;
};

function AddActivity() {
  const { context, extra } = useActivity<Extra>();

  const isEditMode = extra.editGroup;
  const [group, setGroup] = React.useState("lernfeld_1");
  const [name, setName] = React.useState(!isEditMode ? "Lernfeld 1" : extra.name);
  const [description, setDescription] = React.useState(
    !isEditMode ? "Güter annehmen und kontrolieren" : extra.description
  );
  const { cards, setCards } = useKartei();

  os.useOnBackPressed(context.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <ToolbarButton icon={ArrowBackIcon} onClick={context.popPage} />
        </div>
        <div className="center">{!isEditMode ? "Neue Gruppe" : "Gruppe Bearbeiten"}</div>
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
    try {
      const obj: Kartei = {
        group: group,
        name: name,
        description: description,
        karten: [],
      };

      if (!validGroup(group)) {
        os.toast("Bitte achte drauf, dass keine Leerzeichen verwendet werden, oder bindestriche", "short");
      } else {
        setCards((tmp) => {
          if (tmp.some((elem) => elem?.group === group)) {
            os.toast(`Diese Gruppe is bereits vorhanden.`, "short");
          } else {
            tmp = [...tmp, obj];
            context.popPage();
            os.toast(`Deine Gruppe (${name}) wurde gespeichert.`, "short");
          }
          return tmp;
        });
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleEdit = () => {
    const { index } = extra;

    setCards((groups) => {
      groups[index].name = name;
      groups[index].description = description;
      return groups;
    });
    context.popPage();
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <section style={{ padding: 8 }}>
        <span>
          {!isEditMode && (
            <TextField
              fullWidth
              // margin="dense"
              type="text"
              label="Gruppe"
              value={group}
              variant="outlined"
              onChange={handleGroupChange}
            />
          )}
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
        <Button
          style={{ marginTop: 8 }}
          fullWidth
          variant="contained"
          disableElevation
          onClick={!isEditMode ? handleSave : handleEdit}
        >
          Speichern
        </Button>
      </section>
    </Page>
  );
}

export default AddActivity;
