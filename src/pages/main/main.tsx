import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { getQuery } from 'src/getQuery';
import { Filters } from 'src/components/organisms/filters';

import styles from './main.scss';

import { useStore } from 'src/store';

import { Articles } from 'src/components/organisms/articles';
import { ErrorWrapper } from 'src/components/molecules/error';
import { Slider } from 'src/components/molecules/slider';

const Main: React.FC = () => {
  const location = useLocation();
  const query = getQuery(location);
  const { articles: articlesStore } = useStore();
  const articles = articlesStore.getSortedArticles(query);

  const getArticles = React.useCallback(
    (isMore?: boolean) => {
      articlesStore.getArticles(query, isMore);
    },
    [articlesStore, query],
  );

  React.useEffect(() => {
    getArticles();
  }, []);

  const handleClickSource = (id: string) => {
    articlesStore.getSourceArticles(id);
  };

  const { statuses } = articlesStore;

  return (
    <div className={styles.layout}>
      <Filters />
      <ErrorWrapper error={statuses.articles.error}>
        <Articles
          articles={articles}
          isLoading={statuses.articles.isLoading}
          onEndedList={getArticles}
          onClickSource={handleClickSource}
        />
        <Slider isOpen={statuses.source.isLoaded}>
          <Articles
            articles={articlesStore.source.articles}
            isLoading={false}
            onClickSource={handleClickSource}
          />
        </Slider>
      </ErrorWrapper>
    </div>
  );
};

export default observer(Main);
