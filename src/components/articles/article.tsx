import * as React from "react";
import cls from "classnames";

import { IArticle } from "src/types";

import styles from "./article.scss";

interface ITableComponentProps {
  article: IArticle;
  isFavourite: boolean;
  onAddFavourite?: (id: number) => void;
}

const Row: React.FC<ITableComponentProps> = ({
  article,
}) => {
  return (
    <div key={article.publishedAt}>
      <div className={styles.row}>
        <a className={styles.text} href={article.url}>
          <div className={styles.name}>{article.title}</div>
          <div className={styles.phrase}>{article.description}</div>
        </a>
        <img src={article.urlToImage} alt={article.title} height="300px" loading="lazy"/>
        <div className={styles.cell}>{article.author}</div>
      </div>
    </div>
  );
};

export default Row;
