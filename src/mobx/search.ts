import { getArticlesApi } from "src/services/api";
import { IArticle } from "src/types";
import { observable, action, computed } from "mobx";
import { createTransformer } from "mobx-utils";

interface IQuery {
  [x: string]: string;
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

export class ArticlesStore {
  @observable articles: IArticle[] = [];
  @observable favouriteIds: number[] = [];
  @observable isLoading: boolean = false;
  @observable error: string | null = null;

  @action getArticles = async () => {
    this.isLoading = true;
    try {
      const data = await getArticlesApi();
      this.articles = data;
    } catch (error) {
      return error;
    }
    this.isLoading = false;
  };

  @computed get getSortedArticles() {
    return createTransformer((query: IQuery) => {
      const filteredArticles = this.articles.filter(articles =>
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
}
