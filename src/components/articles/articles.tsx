import * as React from "react";
import cls from "classnames";

import { IArticle } from "src/types";
import Row from "./article";

import styles from "./articles.scss";

interface IArticlesComponentProps {
  articles: IArticle[];
  onAddFavourite?: (id: number) => void;
  favouritesIds?: number[];
  isLoading: boolean;
}

const Articles: React.FC<IArticlesComponentProps> = ({
  articles,
  onAddFavourite,
  isLoading
}) => {

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!articles || articles.length === 0) {
    return <div>No results. Try to use other filters...</div>;
  }

  const renderView = (article: IArticle): React.ReactElement | null => {
    return (
      <Row
        key={article.publishedAt}
        article={article}
        isFavourite={false}
      />
    );
  };

  return (
    <div className={cls(styles.standartArticles)}>
      {articles.map(article => renderView(article))}
    </div>
  );
};

export default Articles;
