import { SourcesPage } from './sources';
import { ArticlesStore } from 'src/store/headlines';
import { types, Instance, onSnapshot } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

const RootModel = types.model({
  articles: ArticlesStore,
  sources: SourcesPage,
});

export const rootStore = RootModel.create({
  articles: {
    articles: [],
    status: 'initial',
    error: '',
    source: {
      error: '',
      status: 'initial',
      articles: [],
    },
    page: 0,
  },
  sources: {
    sources: [],
    status: {
      error: '',
      state: 'initial',
    },
    form: {
      fields: {
        category: '',
        language: '',
        country: '',
      },
      step: 0,
    },
  },
});

onSnapshot(rootStore, snapshot => console.log('Snapshot: ', snapshot));

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
