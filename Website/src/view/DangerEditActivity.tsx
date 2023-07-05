import { Page, Toolbar } from "react-onsenui";
import { BackButton } from "@Components/BackButton";
import { useActivity } from "@Hooks/useActivity";
import { StyledSection } from "@Components/StyledSection";
import React from "react";
import { useKartei } from "@Hooks/useKartei";
import "jsoneditor-react/es/editor.min.css";
import { JsonEditor as Editor } from "jsoneditor-react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import SaveIcon from "@mui/icons-material/Save";
import schema from "@Util/groups.schema.json";
import Ajv from "ajv";
import { useConfirm } from "material-ui-confirm";
import { useStrings } from "@Hooks/useStrings";
import { os } from "@Native/Os";
import { ToolbarButton } from "@Components/onsenui/ToolbarButton";

function DangerEditActivity() {
  const { context, extra } = useActivity();
  const { cards, setCards } = useKartei();
  const [cachedCards, setCachedCards] = React.useState(cards);
  const confirm = useConfirm();
  const { strings } = useStrings();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">Dangerus Card Editor</div>
        <div className="right">
          <ToolbarButton
            icon={SaveIcon}
            onClick={() => {
              const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
              const validate = ajv.compile({
                type: "array",
                items: schema,
              });
              const valid = validate(cachedCards) as boolean;

              if (valid) {
                confirm({
                  title: strings.important,
                  description: strings.import_description,
                  confirmationText: strings.continue,
                  cancellationText: strings.cancel,
                })
                  .then(() => {
                    setCards(cachedCards, (d) => {
                      os.toast("Saved", "short");
                    });
                  })
                  .catch(() => {});
              } else {
                os.toast(strings.json_mismatch, "short");
              }
            }}
          />
        </div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <StyledSection>
        <Editor value={cachedCards} onChange={setCachedCards} />
      </StyledSection>
    </Page>
  );
}

export default DangerEditActivity;
