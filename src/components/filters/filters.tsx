import * as React from 'react';
import qs from 'qs';
import styles from './filters.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { Input } from 'components/input';
import { Tabs } from 'components/tabs';

import { getQuery } from 'src/getQuery';

interface Props {}
interface IOption {
  id: number;
  label: string;
  value: string;
}

const orderOptions: IOption[] = [
  { id: 0, label: '↑', value: 'asc' },
  { id: 1, label: '↓', value: 'desc' },
];

const Filters: React.FC<Props> = () => {
  const history = useHistory();
  const location = useLocation();
  const query = getQuery(location);

  const handleOrder = React.useCallback(
    (option: IOption): void => {
      const queryString = qs.stringify({ ...query, order: option.value });
      history.push({ search: decodeURIComponent(queryString) });
    },
    [query],
  );

  const handleChange = React.useCallback(
    (value: string) => {
      const queryString = qs.stringify({ ...query, search: value });
      history.push({ search: decodeURIComponent(queryString) });
    },
    [query],
  );

  return (
    <div className={styles.filters}>
      <Input className={styles.input} onChange={handleChange} value={query.search} />
      <div className={styles.tabs}>
        <Tabs<IOption>
          value={query.order}
          className={styles.arrows}
          onClick={handleOrder}
          options={orderOptions}
        />
      </div>
    </div>
  );
};

export default Filters;
