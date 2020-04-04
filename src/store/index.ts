import { ArticlesStore } from "src/store/main";
import { types, Instance, onSnapshot } from "mobx-state-tree";
import { createContext, useContext } from "react";

const RootModel = types.model({
  articles: ArticlesStore,
});

export const rootStore = RootModel.create({
  articles: {
    articles: [],
    isLoading: false,
    favouriteIds: [],
    error: "",
    page: 0,
  },
});

onSnapshot(rootStore, (snapshot) => console.log("Snapshot: ", snapshot));

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
