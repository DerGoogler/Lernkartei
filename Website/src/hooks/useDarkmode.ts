import { useNativeStorage } from "../native/SharedPreferences";
import { Dispatch, SetPrefAction } from "web-shared-preferences";

export function useDarkmode(): [boolean, Dispatch<SetPrefAction<boolean>>] {
  // ignore that, that's an library issue
  return useNativeStorage.boolean("darkmode", false) as [boolean, Dispatch<SetPrefAction<boolean>>];
}
