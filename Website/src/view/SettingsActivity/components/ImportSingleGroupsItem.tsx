import { useActivity } from "@Hooks/useActivity";
import ListItemButton from "@mui/material/ListItemButton";
import { os } from "@Native/Os";
import Ajv from "ajv";
import { FileChooserActivity } from "../../FileChooserActivity";
import { useKartei } from "../../../hooks/useKartei";
import { StyledListItemText } from "./StyledListItemText";
import schema from "@Util/groups.schema.json";
import { useRef } from "react";
import chooseFile from "../../FileChooserActivity/chooseFile";
import { useStrings } from "@Hooks/useStrings";

export const ImportSingleGroupsItem = () => {
  const { context } = useActivity();
  const { actions } = useKartei();
  const { strings } = useStrings();

  const upload = useRef<HTMLInputElement>(null);
  const ajv = new Ajv();

  const handleFileChange = (event: any) => {
    chooseFile(event, (event: any, file: any, input: any) => {
      const validate = ajv.compile(schema);

      const content = JSON.parse(event.target.result);

      const valid = validate(content) as boolean;
      if (valid) {
        actions.addGroup({
          group: content.group,
          data: content,
          onExists: () => {
            os.toast(strings.group_exist, "short");
          },
          callback: () => {
            os.toast(
              strings.formatString(strings.group_added, {
                name: content.name,
              }) as string,
              "short"
            );
          },
        });
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
                  useGroupsImport: false,
                },
              },
            });
          } else {
            upload.current?.click();
          }
        }}
      >
        <StyledListItemText primary={strings.single_import} secondary={strings.single_import_settings_subtext} />
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
