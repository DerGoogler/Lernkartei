import React, { SetStateAction } from "react";
import { useNativeStorage } from "./useNativeStorage";

interface KarteiContext {
  cards: Kartei[];
  setCards: (state: SetStateAction<Kartei[]>) => void;
  actions: {
    addGroup: (data: AddGroupsData) => void;
    addKarte: (data: AddKarteData) => void;
    removeKarte: (data: RemoveKarteData) => void;
    removeGroup: (data: RemoveGroupData) => void;
    filterGroups: (value: string) => Kartei[];
    filterCards: (index: number, value: string) => Karten[];
  };
}

const KarteiContext = React.createContext<KarteiContext>({
  cards: {} as Kartei[],
  setCards: (state: SetStateAction<Kartei[]>) => {},
  actions: {
    addGroup: (data: AddGroupsData) => {},
    addKarte: (data: AddKarteData) => {},
    removeKarte: (data: RemoveKarteData) => {},
    removeGroup: (data: RemoveGroupData) => {},
    // @ts-ignore
    filterGroups: (value: string): Kartei[] => {},
    // @ts-ignore
    filterCards: (index: number, value: string): Karten[] => {},
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
type RemoveGroupData = {
  group: string;
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

  const removeGroup = (data: RemoveGroupData) => {
    setCards((tmp) => {
      tmp = tmp.filter((remv) => remv.group != data.group);
      if (data.callback instanceof Function) data.callback();
      return tmp;
    });
  };

  const filterGroups = (value: string) => {
    return cards.filter(
      (group) =>
        group.name.toLowerCase().includes(value.toLowerCase()) ||
        group.group.toLowerCase().includes(value.toLowerCase()) ||
        group.description.toLowerCase().includes(value.toLowerCase())
    );
  };

  const filterCards = (index: number, value: string) => {
    return cards[index].karten.filter((card) => card.shortDescription.toLowerCase().includes(value.toLowerCase()));
  };

  return (
    <KarteiContext.Provider
      value={{ cards, setCards, actions: { addGroup, addKarte, removeKarte, removeGroup, filterGroups, filterCards } }}
    >
      {props.children}
    </KarteiContext.Provider>
  );
};
