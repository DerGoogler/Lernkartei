import { BackButton, Page, Toolbar, ToolbarButton } from "react-onsenui";
import { Edit } from "@mui/icons-material";
import { Icon } from "../components/Icon";
import AddCardToGroupActivity from "./AddCardToGroupActivity";
import webview from "../native/WebView";
import { Markup } from "../components/Markdown";

type PP = { shortDesc: string; desc: string; index: number | string; cardIndex: number };

interface Props extends PushProps<PP> {}

function DescriptonActivity({ pageTools, extra }: Props) {
  const { desc, index, shortDesc, cardIndex } = extra;

  webview.useOnBackPressed(pageTools.popPage);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={pageTools.popPage}>Back</BackButton>
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
