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
  onAddFavourite?: (id: number) => void;
  onEndedList: (v: boolean) => void;
}

const Articles: React.FC<IArticlesComponentProps> = observer(
  ({ articles, onEndedList, isLoading }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const handleIntersect = () => {
      onEndedList(true);
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
      <Row key={article.publishedAt} article={article} isFavourite={false} />
    );

    return (
      <>
        <div className={cls(styles.standartArticles)} ref={wrapperRef}>
          {articles.map(article => renderView(article))}
        </div>
        <div ref={wrapperRef}></div>
      </>
    );
  },
);

export default Articles;
