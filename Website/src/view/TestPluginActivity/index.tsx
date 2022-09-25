import Editor from "@monaco-editor/react";
import { BackButton, Page, Toolbar, ToolbarButton } from "react-onsenui";
import { Icon } from "../../components/Icon";
import { useActivity } from "../../hooks/useActivity";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import evil from "../../plugin/evil";
import { useRef } from "react";

import source1 from "!!raw-loader!./util/types.d.ts";
import onsenTypes from "!!raw-loader!./../../../node_modules/onsenui/esm/onsenui.d.ts";
import editorTheme from "./util/editorTheme";

function TestPluginActivity() {
  const { context, extra } = useActivity<any>();

  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    monaco.editor.defineTheme("editorTheme", editorTheme);
    monaco.editor.setTheme("editorTheme");

    editorRef.current = editor;

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      // @ts-ignore
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true,
    });

    const libOs = "ts:filename/os.d.ts";
    const libOns = "ts:filename/ons.d.ts";
    monaco.languages.typescript.javascriptDefaults.addExtraLib(source1, libOs);
    monaco.languages.typescript.javascriptDefaults.addExtraLib(onsenTypes, libOns);
    // When resolving definitions and references, the editor will try to use created models.
    // Creating a model for the library allows "peek definition/references" commands to work with the library.
    if (monaco.editor.getModels().length === 0) {
      monaco.editor.createModel(source1, "typescript", monaco.Uri.parse(libOs));
      monaco.editor.createModel(onsenTypes, "typescript", monaco.Uri.parse(libOns));
    }
  }

  function exec() {
    evil(editorRef.current?.getValue());
  }

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage}>Back</BackButton>
        </div>
        <div className="center">Plugin tester</div>
        <div className="right">
          <ToolbarButton onClick={exec}>
            <Icon icon={PlayArrowIcon} keepLight />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Editor
        height="calc(100vh - 56px)"
        defaultLanguage="javascript"
        defaultValue={`init("sample_plugin", (plugin)=> {\n    const MdPlugin = plugin.require("mdplugin")\n    const { notification } = plugin.require("ons")\n    \n    // Don't play to much with that, it can break the app\n    MdPlugin.addRules([\n        ["[b](.*?)[/b]", "<b>$1</b>"]\n    ])\n\n    notification.alert(\`Id of this plugin: \${plugin.id}\`)\n})`}
        onMount={handleEditorDidMount}
      />
    </Page>
  );
}

export default TestPluginActivity;
