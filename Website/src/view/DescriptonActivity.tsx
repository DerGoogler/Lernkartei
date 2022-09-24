import { BackButton, Page, Toolbar } from "react-onsenui";
import { Markup } from "../components/Markdown";
import { useActivity } from "../components/RoutedApp";
import { os } from "../native/Os";

type Extra = { shortDesc: string; desc: string; index: number | string; cardIndex: number };

function DescriptonActivity() {
  const { context, extra } = useActivity<Extra>();

  const { desc, index, shortDesc, cardIndex } = extra;

  os.useOnBackPressed(context.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage}>Back</BackButton>
        </div>
        <div className="center">#{index}</div>
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
