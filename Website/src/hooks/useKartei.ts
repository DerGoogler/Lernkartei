import { useNativeStorage } from "../native/SharedPreferences";
import { Dispatch, SetPrefAction } from "web-shared-preferences";

export function useKartei(): [Array<Kartei>, Dispatch<SetPrefAction<Array<Kartei>>>] {
  // ignore that, that's an library issue
  return useNativeStorage.json<Kartei[]>("katei", []) as [Array<Kartei>, Dispatch<SetPrefAction<Array<Kartei>>>];
}
