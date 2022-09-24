import { MdPlugin } from "../../plugin/kplugin";
import { Rules, rules as regeln } from "./rules";


export function parser(text: string, plugins: MdPlugin.Pref[]) {
  plugins.forEach(({ rules }) => {
    rules.concat(regeln).forEach(([rule, template]) => {
      text = text.replace(new RegExp(rule, "g"), template);
    });
  });
  return text;
}
