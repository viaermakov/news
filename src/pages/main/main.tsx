import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { getQuery } from 'src/getQuery';
import { Filters } from 'src/components/organisms/filters';

import styles from './main.scss';

import { useStore } from 'src/store';

import { Articles } from 'src/components/organisms/articles';
import { ErrorWrapper } from 'src/components/molecules/error';

const Main: React.FC = observer(() => {
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

  const {
    status: { error, isLoading },
  } = articlesStore;

  return (
    <div className={styles.layout}>
      <Filters />
      <ErrorWrapper error={error}>
        <Articles articles={articles} isLoading={isLoading} onEndedList={getArticles} />
      </ErrorWrapper>
    </div>
  );
});

export default Main;
