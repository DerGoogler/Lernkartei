import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { useNativeStorage } from "./useNativeStorage";
import { SetStateAction } from "./useStateCallback";

interface KarteiContext {
  cards: Kartei[];
  setCards: (state: SetStateAction<Kartei[]>, callback?: (state: Kartei[]) => void) => void;
  actions: {
    addGroup: (data: AddGroupsData) => void;
    editGroup: (index: number, data: EditGroupsData) => void;
    editKarte: (cardIndex: number, index: number, data: EditKarteData) => void;
    addKarte: (data: AddKarteData) => void;
    removeKarte: (data: RemoveKarteData) => void;
    removeGroup: (data: RemoveGroupData) => void;
    filterGroups: (value: string) => Kartei[];
    filterCards: (index: number, value: string) => Karten[];
  };
}

const KarteiContext = React.createContext<KarteiContext>({
  cards: {} as Kartei[],
  setCards: (state: SetStateAction<Kartei[]>, callback?: (state: Kartei[]) => void) => {},
  actions: {
    addGroup: (data: AddGroupsData) => {},
    editGroup: (index: number, data: EditGroupsData) => {},
    editKarte: (cardIndex: number, index: number, data: EditKarteData) => {},
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
  callback?: (state: Kartei[]) => void;
};

type EditGroupsData = {
  name: string;
  description: string;
  callback?: (state: Kartei[]) => void;
};

type EditKarteData = {
  shortDescription: string;
  description: string;
  callback?: (state: Kartei[]) => void;
};

type AddKarteData = {
  index: number;
  data: Karten;
  callback?: (state: Kartei[]) => void;
};
type RemoveKarteData = {
  index: number;
  shortDescription: string;
  callback?: (state: Kartei[]) => void;
};
type RemoveGroupData = {
  group: string;
  callback?: (state: Kartei[]) => void;
};

export const KarteiProvider = (props: KarteiProviderProps) => {
  const [cards, setCards] = useNativeStorage<Kartei[]>("katei", []);

  const addGroup = (data: AddGroupsData) => {
    setCards((tmp) => {
      if (tmp.some((elem) => elem?.group === data.group)) {
        if (data.onExists instanceof Function) data.onExists();
      } else {
        tmp = [...tmp, data.data];
        if (data.callback instanceof Function) data.callback(tmp);
      }
      return tmp;
    });
  };

  const editGroup = (index: number, data: EditGroupsData) => {
    setCards((tmp) => {
      tmp[index].name = data.name;
      tmp[index].description = data.description;
      return tmp;
    }, data.callback);
  };

  const editKarte = (cardIndex: number, index: number, data: EditKarteData) => {
    setCards((tmp) => {
      tmp[cardIndex].karten[index].shortDescription = data.shortDescription;
      tmp[cardIndex].karten[index].description = data.description;
      return tmp;
    }, data.callback);
  };

  const addKarte = (data: AddKarteData) => {
    setCards((tmp) => {
      tmp[data.index].karten.push(data.data);
      return tmp;
    }, data.callback);
  };

  const removeKarte = (data: RemoveKarteData) => {
    setCards((tmp) => {
      tmp[data.index].karten = tmp[data.index].karten.filter((remv) => remv.shortDescription != data.shortDescription);
      return tmp;
    }, data.callback);
  };

  const removeGroup = (data: RemoveGroupData) => {
    setCards((tmp) => {
      tmp = tmp.filter((remv) => remv.group != data.group);
      return tmp;
    }, data.callback);
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
      value={{
        cards,
        setCards,
        actions: { addGroup, editGroup, editKarte, addKarte, removeKarte, removeGroup, filterGroups, filterCards },
      }}
    >
      {props.children}
    </KarteiContext.Provider>
  );
};
