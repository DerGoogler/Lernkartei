import { Button, TextField } from "@mui/material";
import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import { os } from "../native/Os";
import { useKartei } from "../hooks/useKartei";
import { useActivity } from "../hooks/useActivity";
import { ToolbarButton } from "../components/ToolbarButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStrings } from "../hooks/useStrings";

type Extra = {
  name: string;
  description: string;
  editGroup: boolean;
  index: number;
};

function AddActivity() {
  const { context, extra } = useActivity<Extra>();

  const { setCards, actions } = useKartei();
  const { strings } = useStrings();

  const isEditMode = extra.editGroup;
  const [groupId, setGroupId] = React.useState("lernfeld_1");
  const [name, setName] = React.useState(!isEditMode ? "Lernfeld 1" : extra.name);
  const [description, setDescription] = React.useState(
    !isEditMode ? "Güter annehmen und kontrolieren" : extra.description
  );

  os.useOnBackPressed(context.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <ToolbarButton icon={ArrowBackIcon} onClick={context.popPage} />
        </div>
        <div className="center">{!isEditMode ? strings.new_group : strings.edit_group}</div>
      </Toolbar>
    );
  };

  const validGroup = (group: string): boolean => {
    return /^\w+$/.test(group);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupId(e.target.value.toLowerCase());
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
        group: groupId,
        name: name,
        description: description,
        karten: [],
      };

      if (!validGroup(groupId)) {
        os.toast(strings.noUmlauts, "short");
      } else {
        actions.addGroup({
          group: groupId,
          data: obj,
          onExists() {
            os.toast(strings.group_exist, "short");
          },
          callback() {
            context.popPage();
            os.toast(
              strings.formatString(strings.group_saved, {
                name: name,
              }) as string,
              "short"
            );
          },
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
              label={strings.group}
              value={groupId}
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
            label={strings.name}
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
            label={strings.description}
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
          {strings.save}
        </Button>
      </section>
    </Page>
  );
}

export default AddActivity;
