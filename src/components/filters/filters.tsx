import * as React from 'react';
import qs from 'qs';

import { useHistory, useLocation } from 'react-router-dom';

import { getQuery } from 'src/getQuery';
import { useStore } from 'src/store';

import { Input } from 'components/input';
import { Tabs } from 'components/tabs';
import { Categories } from './blocks/categories';
import { IOption, ORDER_OPTIONS, CATEGORIES, PAGES } from './constants';

import styles from './filters.scss';

const Filters: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const query = getQuery(location);
  const { articles: articlesStore } = useStore();

  const handleOrder = React.useCallback(
    (option: IOption): void => {
      const queryString = qs.stringify({ ...query, order: option.value });
      history.push({ search: decodeURIComponent(queryString) });
    },
    [query, history],
  );

  const handleChange = React.useCallback(
    (value: string) => {
      const newQuery = { ...query, search: value };
      const queryString = qs.stringify(newQuery);
      history.push({ search: decodeURIComponent(queryString) });
      articlesStore.searchArticles(newQuery);
    },
    [articlesStore, query, history],
  );

  const handleSetCategory = React.useCallback(
    (value: string) => {
      const newQuery = { ...query, category: value };
      const queryString = qs.stringify(newQuery);
      history.push({ search: decodeURIComponent(queryString) });
      articlesStore.setCategory(newQuery);
    },
    [articlesStore, query, history],
  );

  return (
    <div className={styles.filters}>
      <Categories className={styles.pages} onClick={handleSetCategory} categories={PAGES} />
      <Input className={styles.input} onChange={handleChange} value={query.search} />
      <div className={styles.tabs}>
        <Tabs<IOption>
          value={query.order}
          className={styles.arrows}
          onClick={handleOrder}
          options={ORDER_OPTIONS}
        />
        <Categories onClick={handleSetCategory} categories={CATEGORIES} />
      </div>
    </div>
  );
};

export default Filters;
