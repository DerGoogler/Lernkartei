import Ajv from "ajv";
import ons from "onsenui";
import { ListItem } from "react-onsenui";
import { useKartei } from "../../../hooks/useKartei";

export const ImportGroupsItem = () => {
  const { cards, setCards } = useKartei();
  // const [openFileSelector, { filesContent, loading }] = useFilePicker({
  //   readAs: "Text",
  //   accept: ".json",
  //   multiple: true,
  //   limitFilesConfig: { max: 1 },
  // });
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

  const schema = {
    type: "array",
    items: {
      type: "object",
      required: ["group", "name", "description", "karten"],
      properties: {
        group: {
          type: "string",
        },
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        karten: {
          type: "array",
          items: {
            type: "object",
            required: ["shortDescription", "description"],
            properties: {
              shortDescription: {
                type: "string",
              },
              description: {
                type: "string",
              },
            },
          },
        },
      },
    },
  };

  const handleImport = () => {
    // openFileSelector();
    try {
      const content: any = "JSON.parse(filesContent[0].content)";

      const validate = ajv.compile(schema);

      const valid = validate(content);
      if (!valid) {
        setCards(content);
      } else {
        ons.notification.alert(JSON.stringify(validate.errors));
      }
    } catch (error: any) {
      ons.notification.alert(error.message);
    }
  };

  return (
    <>
      <ListItem onClick={handleImport}>
        <div className="center">
          <span className="list-item__title">Import</span>
          <span className="list-item__subtitle">Importiere zuvor gesicherte Gruppen und Karten</span>
        </div>
      </ListItem>
    </>
  );
};
