import { useActivity } from "@Hooks/useActivity";
import { useKartei } from "@Hooks/useKartei";
import { useStrings } from "@Hooks/useStrings";
import ListItemButton from "@mui/material/ListItemButton";
import { File } from "@Native/File";
import { os } from "@Native/Os";
import { Page, Toolbar } from "react-onsenui";
import { StyledListItemText } from "../../view/SettingsActivity/components/StyledListItemText";
import schema from "@Util/groups.schema.json";
import Ajv from "ajv";
import { BackButton } from "@Components/BackButton";
import { useConfirm } from "material-ui-confirm";

export const FileChooserActivity = () => {
  const { context } = useActivity<any>();
  const { setCards, actions } = useKartei();
  const { strings } = useStrings();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">{strings.choose_file}</div>
      </Toolbar>
    );
  };

  const files = new File("").list();

  return (
    <Page renderToolbar={renderToolbar}>
      {files.map((file) => (
        <FileComponent setCards={setCards} file={file} actions={actions} />
      ))}
    </Page>
  );
};

const FileComponent = ({ file, actions, setCards }: any) => {
  const { extra } = useActivity<any>();
  const { strings } = useStrings();

  const confirm = useConfirm();

  const isGroupsImport: boolean = extra.useGroupsImport;

  const handleSingleAdd = () => {
    const _file = new File(file);
    const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    const validate = ajv.compile(schema);
    const content = _file.readJSON<Kartei>();
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
  };

  const handleOverwrite = () => {
    const _file = new File(file);
    const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    const validate = ajv.compile({
      type: "array",
      items: schema,
    });
    const content = _file.readJSON<Kartei>();
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
  };

  return (
    <ListItemButton onClick={!isGroupsImport ? handleSingleAdd : handleOverwrite}>
      <StyledListItemText primary={file} />
    </ListItemButton>
  );
};
