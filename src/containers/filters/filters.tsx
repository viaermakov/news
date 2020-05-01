import * as React from 'react';
import qs from 'qs';

import { useHistory, useLocation } from 'react-router-dom';

import { getQuery } from 'src/getQuery';
import { useStore } from 'src/store';

import { IOption } from 'src/components/filters/constants';
import { Filters } from 'src/components/filters';

const FiltersContainer: React.FC = () => {
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
    <Filters
      onChangeCategory={handleSetCategory}
      onChangeSearch={handleChange}
      onOrder={handleOrder}
    />
  );
};

export default FiltersContainer;
