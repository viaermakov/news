import * as React from 'react';

import { useLocation } from 'react-router-dom';
import { getQuery } from 'src/getQuery';

import { Input } from 'components/input';
import { Tabs } from 'components/tabs';
import { Categories } from './blocks/categories';
import { IOption, ORDER_OPTIONS, CATEGORIES, PAGES } from './constants';

import styles from './filters.scss';

interface IFilters {
  onChangeCategory: (value: string) => void;
  onChangeSearch: (value: string) => void;
  onOrder: (option: IOption) => void;
}

const Filters: React.FC<IFilters> = ({ onChangeCategory, onChangeSearch, onOrder }) => {
  const location = useLocation();
  const query = getQuery(location);

  return (
    <div className={styles.filters}>
      <Categories className={styles.pages} onClick={onChangeCategory} categories={PAGES} />
      <Input className={styles.input} onChange={onChangeSearch} value={query.search} />
      <div className={styles.tabs}>
        <Tabs<IOption>
          value={query.order}
          className={styles.arrows}
          onClick={onOrder}
          options={ORDER_OPTIONS}
        />
        <Categories onClick={onChangeCategory} categories={CATEGORIES} />
      </div>
    </div>
  );
};

export default Filters;
