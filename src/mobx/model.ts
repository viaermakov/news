import { createTransformer } from "mobx-utils";
import { types, flow, cast } from "mobx-state-tree";

import { IArticle } from "src/types";
import { IResponse, getApi } from "src/services/api";

interface IQuery {
  [x: string]: string;
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

export const Source = types.model({
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string)
});

export const Article = types.model({
  author: types.maybeNull(types.string),
  title: types.string,
  description: types.string,
  url: types.string,
  urlToImage: types.string,
  publishedAt: types.string,
  content: types.maybeNull(types.string),
  source: Source
});

export const ArticlesStore = types
  .model({
    articles: types.optional(types.array(Article), []),
    favouriteIds: types.array(types.number),
    isLoading: types.boolean
  })
  .views(self => ({
    get getSortedArticles() {
      return createTransformer((query: IQuery) => {
        const filteredArticles = self.articles.filter(articles =>
          articles.title.toLowerCase().includes(query.search || "")
        );
        const isReverse = query.order === "desc";

        switch (query.sorting) {
          case "id": {
            const sortedArticles = filteredArticles.sort(
              (a: IArticle, b: IArticle) =>
                new Date(a.publishedAt).valueOf() -
                new Date(a.publishedAt).valueOf()
            );
            return isReverse ? sortedArticles.reverse() : sortedArticles;
            break;
          }
          case "age": {
            const sortedArticles = filteredArticles.sort(
              (a: IArticle, b: IArticle) =>
                new Date(a.publishedAt).valueOf() -
                new Date(b.publishedAt).valueOf()
            );
            return isReverse ? sortedArticles.reverse() : sortedArticles;
            break;
          }
          case "name": {
            const sortedArticles = filteredArticles.sort(sortByName);
            return isReverse ? sortedArticles.reverse() : sortedArticles;
            break;
          }
          default:
            return isReverse ? filteredArticles.reverse() : filteredArticles;
        }
      });
    }
  }))
  .actions(self => {
    const getArticles = flow(function*() {
      self.isLoading = true;

      const { body }: IResponse<IData> = yield getApi({
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "ru"
        }
      });

      self.isLoading = false;
      self.articles = cast(body.articles);
    });

    return {
      getArticles
    };
  });
