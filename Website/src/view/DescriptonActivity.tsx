import { ListItem, Page, Toolbar } from "react-onsenui";
import { BackButton } from "@Components/BackButton";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
import { os } from "@Native/Os";

type Extra = { shortDesc: string; desc: string; index: number | string; cardIndex: number };

function DescriptonActivity() {
  const { context, extra } = useActivity<Extra>();

  const { desc, index, shortDesc, cardIndex } = extra;

  os.useOnBackPressed(context.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">{shortDesc}</div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Markup children={desc} />
    </Page>
  );
}

export default DescriptonActivity;
