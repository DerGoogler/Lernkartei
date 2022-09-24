import { ParserPlugin, Rules } from "../components/Markdown/rules";
import { useNativeStorage } from "../native/SharedPreferences";

export const useMdPlugins = () => {
  return useNativeStorage.json<ParserPlugin[]>("md-plugins", []);
};
