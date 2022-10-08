import React, { SetStateAction } from "react";
import { os } from "../native/Os";
import { useNativeStorage } from "./useNativeStorage";
import { useStrings } from "./useStrings";

const KarteiContext = React.createContext({
  cards: {} as Kartei[],
  setCards: (state: SetStateAction<Kartei[]>) => {},
  actions: {
    addGroup: (data: AddGroupsData) => {},
    addKarte: (data: AddKarteData) => {},
    removeKarte: (data: RemoveKarteData) => {},
  },
});

export function useKartei() {
  return React.useContext(KarteiContext);
}

export type KarteiProviderProps = {
  children: React.ReactNode;
};

type AddGroupsData = {
  group: string;
  data: Kartei;
  onExists?: () => void;
  callback?: () => void;
};

type AddKarteData = {
  index: number;
  data: Karten;
  callback?: () => void;
};
type RemoveKarteData = {
  index: number;
  shortDescription: string;
  callback?: () => void;
};

export const KarteiProvider = (props: KarteiProviderProps) => {
  const [cards, setCards] = useNativeStorage<Kartei[]>("katei", []);

  const addGroup = (data: AddGroupsData) => {
    setCards((tmp) => {
      if (tmp.some((elem) => elem?.group === data.group)) {
        if (data.onExists instanceof Function) data.onExists();
      } else {
        tmp = [...tmp, data.data];
        if (data.callback instanceof Function) data.callback();
      }
      return tmp;
    });
  };

  const addKarte = (data: AddKarteData) => {
    setCards((tmp) => {
      tmp[data.index].karten.push(data.data);
      if (data.callback instanceof Function) data.callback();
      return tmp;
    });
  };

  const removeKarte = (data: RemoveKarteData) => {
    setCards((tmp) => {
      tmp[data.index].karten = tmp[data.index].karten.filter((remv) => remv.shortDescription != data.shortDescription);
      if (data.callback instanceof Function) data.callback();
      return tmp;
    });
  };

  return (
    <KarteiContext.Provider value={{ cards, setCards, actions: { addGroup, addKarte, removeKarte } }}>
      {props.children}
    </KarteiContext.Provider>
  );
};
