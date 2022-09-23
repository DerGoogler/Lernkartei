import { useJSON } from "../native/SharedPreferences";
import { accent_colors } from "../theme";

export type AccentColors = Array<{
  name: string;
  value: any;
}>;

export function useScheme() {
  return useJSON<AccentColors[0]>("accent_scheme", accent_colors[0]);
}
