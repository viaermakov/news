import { ICategory } from '../types/index';
import { createTransformer } from 'mobx-utils';
import { types, flow, cast } from 'mobx-state-tree';

import { IArticle } from 'src/types';
import { IResponse, getApi } from 'src/services/api';
import { DATA_STATE } from './types';

interface IQuery {
  search: string;
  category: ICategory;
  order: string;
  sorting: string;
}

interface IData {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

type countryParamType = 'ru' | 'us';

export interface IParams {
  category?: ICategory;
  country?: countryParamType;
  q?: string;
  sources?: string;
  pageSize?: number;
  page?: number;
}

const MAX_PAGE = 5;

function sortByName(a: IArticle, b: IArticle) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

export const SourceType = types.model({
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
});

export const ArticleModel = types.model({
  author: types.maybeNull(types.string),
  title: types.string,
  description: types.maybeNull(types.string),
  url: types.string,
  urlToImage: types.maybeNull(types.string),
  publishedAt: types.string,
  content: types.maybeNull(types.string),
  source: SourceType,
});

export const CategoryType = types.maybe(
  types.union(
    types.literal('business'),
    types.literal('sports'),
    types.literal('entertainment'),
    types.literal('general'),
    types.literal('health'),
    types.literal('science'),
    types.literal('technology'),
  ),
);

export const SourceModel = types.model({
  articles: types.optional(types.array(ArticleModel), []),
  status: types.enumeration('State', ['initial', 'loading', 'loaded', 'failed']),
  error: types.string,
});

export const ArticlesStore = types
  .model({
    status: types.enumeration('State', ['initial', 'loading', 'loaded', 'failed']),
    error: types.string,
    articles: types.optional(types.array(ArticleModel), []),
    source: SourceModel,
    page: types.number,
  })
  .views(self => ({
    get statuses() {
      return {
        articles: {
          isLoading: self.status === DATA_STATE.loading,
          isLoaded: self.status === DATA_STATE.loaded,
          error: self.error,
        },
        source: {
          isLoading: self.source.status === DATA_STATE.loading,
          isLoaded: self.source.status === DATA_STATE.loaded,
          error: self.source.error,
        },
      };
    },

    get getSortedArticles() {
      return createTransformer((query: IQuery) => {
        const isReverse = query.order === 'desc';

        switch (query.sorting) {
          case 'id': {
            const sortedArticles = self.articles.sort(
              (a: IArticle, b: IArticle) =>
                new Date(a.publishedAt).valueOf() - new Date(b.publishedAt).valueOf(),
            );
            return isReverse ? sortedArticles.reverse() : sortedArticles;
          }
          case 'name': {
            const sortedArticles = self.articles.sort(sortByName);
            return isReverse ? sortedArticles.reverse() : sortedArticles;
          }
          default:
            return isReverse ? self.articles.reverse() : self.articles;
        }
      });
    },
  }))
  .actions(self => {
    const setCategory = (query: IQuery) => {
      const params: IParams = {
        q: query.search,
        category: query.category,
      };
      getArticles(params);
    };

    const searchArticles = (query: IQuery) => {
      const params: IParams = {
        q: query.search,
        category: query.category,
      };
      getArticles(params);
    };

    const getArticles = flow(function*(params?: IParams, more?: boolean) {
      let articles = self.articles;

      if (self.page + 1 > MAX_PAGE) {
        return;
      }

      if (more) {
        self.page = self.page + 1;
      } else {
        self.status = DATA_STATE.loading;
        self.page = 1;
        articles = cast([]);
      }

      try {
        const { body }: IResponse<IData> = yield getApi<IParams>({
          url: 'https://newsapi.org/v2/top-headlines',
          params: {
            country: 'ru',
            page: self.page,
            ...params,
          },
        });

        self.articles = cast([...articles, ...body.articles]);
      } catch (e) {
        self.status = e.message;
      }
      self.status = DATA_STATE.loaded;
    });

    const getSourceArticles = flow(function*(sourceId) {
      self.source.status = DATA_STATE.loading;

      try {
        const { body }: IResponse<IData> = yield getApi<IParams>({
          url: 'https://newsapi.org/v2/top-headlines',
          params: {
            sources: sourceId,
          },
        });

        self.source.articles = cast(body.articles);
      } catch (e) {
        self.source.status = DATA_STATE.failed;
        self.source.error = e.message;
      }
      self.source.status = DATA_STATE.loaded;
    });

    return {
      setCategory,
      getArticles,
      getSourceArticles,
      searchArticles,
    };
  });
