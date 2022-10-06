import React, { SetStateAction } from "react";
import { useNativeStorage } from "./useNativeStorage";

const KarteiContext = React.createContext({
  cards: {} as Kartei[],
  setCards: (state: SetStateAction<Kartei[]>) => {},
});

export function useKartei() {
  return React.useContext(KarteiContext);
}

export type KarteiProviderProps = {
  children: React.ReactNode;
};

export const KarteiProvider = (props: KarteiProviderProps) => {
  const [cards, setCards] = useNativeStorage<Kartei[]>("katei", []);
  return <KarteiContext.Provider value={{ cards, setCards }}>{props.children}</KarteiContext.Provider>;
};
