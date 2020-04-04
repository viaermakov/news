import * as React from "react";
import cls from "classnames";

import { IArticle } from "src/types";
import Row from "./article";

import styles from "./articles.scss";
import { useIntersectionObserver } from "src/components/io/io";

interface IArticlesComponentProps {
  articles: IArticle[];
  onAddFavourite?: (id: number) => void;
  favouritesIds?: number[];
  isLoading: boolean;
  onEndedList: (v: boolean) => void;
}

const Articles: React.FC<IArticlesComponentProps> = ({
  articles,
  onEndedList,
  isLoading,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const isMounted = React.useRef(false);

  const [isVisible] = useIntersectionObserver(wrapperRef, {
    rootMargin: '200px',
    //threshold: 1.0,
  });

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    onEndedList(true);
  }, [isVisible]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!articles || articles.length === 0) {
    return <div>No results. Try to use other filters...</div>;
  }

  const renderView = (article: IArticle): React.ReactElement | null => {
    return (
      <Row key={article.publishedAt} article={article} isFavourite={false} />
    );
  };

  return (
    <>
      <div className={cls(styles.standartArticles)} ref={wrapperRef}>
        {articles.map((article) => renderView(article))}
      </div>
      <div ref={wrapperRef}></div>
    </>
  );
};

export default Articles;
