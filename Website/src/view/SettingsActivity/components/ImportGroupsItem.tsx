import { useActivity } from "@Hooks/useActivity";
import ListItemButton from "@mui/material/ListItemButton";
import { os } from "@Native/Os";
import Ajv from "ajv";
import { FileChooserActivity } from "../../FileChooserActivity";
import { useKartei } from "../../../hooks/useKartei";
import { StyledListItemText } from "./StyledListItemText";
import _schema from "@Util/groups.schema.json";
import { useRef } from "react";
import { useConfirm } from "material-ui-confirm";
import chooseFile from "../../FileChooserActivity/chooseFile";
import { useStrings } from "@Hooks/useStrings";

export const ImportGroupsItem = () => {
  const { context } = useActivity();
  const { setCards } = useKartei();
  const { strings } = useStrings();

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
          description: strings.import_description,
          confirmationText: strings.continue,
          cancellationText: strings.cancel,
        })
          .then(() => {
            setCards(content);
          })
          .catch(() => {});
      } else {
        os.toast(strings.json_mismatch, "short");
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
        <StyledListItemText primary="Import" secondary={strings.import_settings_subtext} />
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
