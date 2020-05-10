import * as React from 'react';

import Row from './article/article';
import { IArticle } from 'src/types';
import { useIntersectionObserver } from 'src/helpers/io';
import { observer } from 'mobx-react-lite';
import cls from 'classnames';

import styles from './articles.scss';

interface IArticlesComponentProps {
  articles: IArticle[];
  favouritesIds?: number[];
  isLoading: boolean;
  onClickSource: (id: string) => void;
  onEndedList?: (v: boolean) => void;
}

const Articles: React.FC<IArticlesComponentProps> = ({
  articles,
  onEndedList,
  isLoading,
  onClickSource,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const handleIntersect = () => {
    onEndedList && onEndedList(true);
  };

  useIntersectionObserver(wrapperRef, {
    rootMargin: '30%',
    onIntersect: handleIntersect,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!articles || articles.length === 0) {
    return <div>No results. Try to use other filters...</div>;
  }

  const renderView = (article: IArticle): React.ReactElement | null => (
    <Row
      key={article.publishedAt}
      article={article}
      isFavourite={false}
      onClickSource={onClickSource}
    />
  );

  return (
    <>
      <div className={cls(styles.standartArticles)} ref={wrapperRef}>
        {articles.map(article => renderView(article))}
      </div>
      <div ref={wrapperRef}></div>
    </>
  );
};

export default observer(Articles);
