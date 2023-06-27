import { Button, TextField } from "@mui/material";
import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import { os } from "../native/Os";
import { useKartei } from "../hooks/useKartei";
import { useActivity } from "../hooks/useActivity";
import { ToolbarButton } from "../components/ToolbarButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStrings } from "../hooks/useStrings";
import { useForm } from "@Hooks/useForm";

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

  const { handleChange, groupId, name, description } = useForm({
    initialState: {
      groupId: "lernfeld_1",
      name: !isEditMode ? "Lernfeld 1" : extra.name,
      description: !isEditMode ? "Güter annehmen und kontrolieren" : extra.description,
    },
  });

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
    return /^[a-z0-9_\-]+$/g.test(group);
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
              name="groupId"
              fullWidth
              // margin="dense"
              type="text"
              label={strings.group}
              value={groupId}
              variant="outlined"
              onChange={handleChange}
            />
          )}
        </span>
        <span>
          <TextField
            name="name"
            fullWidth
            margin="dense"
            type="text"
            label={strings.name}
            value={name}
            variant="outlined"
            onChange={handleChange}
          />
        </span>
        <span>
          <TextField
            name="description"
            fullWidth
            margin="dense"
            type="text"
            label={strings.description}
            value={description}
            variant="outlined"
            onChange={handleChange}
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
