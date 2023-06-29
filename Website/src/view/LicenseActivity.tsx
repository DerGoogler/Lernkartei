import { ListItem, Page, Toolbar } from "react-onsenui";
import { BackButton } from "@Components/BackButton";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
// import license from "raw-loader!./../../../LICENSE";

declare const LICENSE: string;

function LicenseActivity() {
  const { context, extra } = useActivity<any>();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">License</div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Markup children={"```\n" + LICENSE + "```\n"} />
    </Page>
  );
}

export default LicenseActivity;
