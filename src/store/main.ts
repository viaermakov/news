import { ICategory } from "../types/index";
import { createTransformer } from "mobx-utils";
import { types, flow, cast } from "mobx-state-tree";

import { IArticle } from "src/types";
import { IResponse, getApi, IParams } from "src/services/api";

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
    types.literal("business"),
    types.literal("sports"),
    types.literal("entertainment"),
    types.literal("general"),
    types.literal("health"),
    types.literal("science"),
    types.literal("technology")
  )
);

export const ArticlesStore = types
  .model({
    articles: types.optional(types.array(ArticleModel), []),
    favouriteIds: types.array(types.number),
    isLoading: types.boolean,
    error: types.string,
    page: types.number,
  })
  .views((self) => ({
    get getSortedArticles() {
      return createTransformer((query: IQuery) => {
        const isReverse = query.order === "desc";

        switch (query.sorting) {
          case "id": {
            const sortedArticles = self.articles.sort(
              (a: IArticle, b: IArticle) =>
                new Date(a.publishedAt).valueOf() -
                new Date(a.publishedAt).valueOf()
            );
            return isReverse ? sortedArticles.reverse() : sortedArticles;
          }
          case "age": {
            const sortedArticles = self.articles.sort(
              (a: IArticle, b: IArticle) =>
                new Date(a.publishedAt).valueOf() -
                new Date(b.publishedAt).valueOf()
            );
            return isReverse ? sortedArticles.reverse() : sortedArticles;
          }
          case "name": {
            const sortedArticles = self.articles.sort(sortByName);
            return isReverse ? sortedArticles.reverse() : sortedArticles;
          }
          default:
            return isReverse ? self.articles.reverse() : self.articles;
        }
      });
    },
  }))
  .actions((self) => {
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

      if (more) {
        self.page = self.page + 1;
      } else {
        self.isLoading = true;
        self.page = 1;
        articles = cast([]);
      }

      try {
        const { body }: IResponse<IData> = yield getApi({
          url: "https://newsapi.org/v2/top-headlines",
          params: {
            country: "ru",
            page: self.page,
            ...params,
          },
        });
        self.articles = cast([...articles, ...body.articles]);
      } catch (e) {
        self.error = e.message;
      }
      self.isLoading = false;
    });

    return {
      setCategory,
      getArticles,
      searchArticles,
    };
  });
