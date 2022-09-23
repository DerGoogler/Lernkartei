import { rules } from "./rules";

export function parser(text: string) {
  rules.forEach(([rule, template]) => {
    text = text.replace(rule, template as string);
  });
  return text;
}
