import { useActivity } from "@Hooks/useActivity";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { os } from "@Native/Os";
import Ajv from "ajv";
import ons from "onsenui";
import { ListItem } from "react-onsenui";
import { FileChooserActivity } from "../../FileChooserActivity";
import { useKartei } from "../../../hooks/useKartei";
import { StyledListItemText } from "./StyledListItemText";
import _schema from "@Util/groups.schema.json";
import { useRef } from "react";
import { useConfirm } from "material-ui-confirm";
import chooseFile from "../../FileChooserActivity/chooseFile";

export const ImportGroupsItem = () => {
  const { context } = useActivity();
  const { cards, setCards } = useKartei();

  const upload = useRef<HTMLInputElement>(null);
  const confirm = useConfirm();

  const ajv = new Ajv();

  const schema = {
    type: "array",
    items: _schema,
  };

  const handleFileChange = (event: any) => {
    chooseFile(event, (event: any, file: any, input: any) => {
      const validate = ajv.compile(schema);

      const content = JSON.parse(event.target.result);

      const valid = validate(content) as boolean;
      if (valid) {
        confirm({
          title: "Import",
          description:
            "Beim Import werden alle Gruppen und Karten Information überschrieben. Sei vorsichtig mit dieser Funktion!",
          confirmationText: "Fortfahren",
          cancellationText: "Abbrechen",
        })
          .then(() => {
            setCards(content);
          })
          .catch(() => {});
      } else {
        os.toast("Das JSON Scheme stimmt nicht überein", "short");
      }
    });
  };

  return (
    <>
      <ListItemButton
        onClick={() => {
          if (os.isAndroid) {
            context.pushPage({
              component: FileChooserActivity,
              props: {
                key: "chooseFile",
                extra: {
                  useGroupsImport: true,
                },
              },
            });
          } else {
            upload.current?.click();
          }
        }}
      >
        <StyledListItemText primary="Import" secondary="Importiere zuvor gesicherte Gruppen und Karten" />
      </ListItemButton>
      <input
        ref={upload}
        type="file"
        style={{ display: "none", marginRight: "4px" }}
        accept=".json"
        onChange={handleFileChange}
      />
    </>
  );
};
