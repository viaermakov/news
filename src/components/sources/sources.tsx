import * as React from 'react';

import { Source } from './source';
import { ISource } from 'src/types';
import { observer } from 'mobx-react-lite';
import cls from 'classnames';

import styles from './sources.scss';

interface ISourcesComponentProps {
  sources: ISource[];
  favouritesIds?: number[];
  isLoading: boolean;
  onAddFavourite?: (id: number) => void;
}

const Sources: React.FC<ISourcesComponentProps> = observer(({ sources, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!sources || sources.length === 0) {
    return <div>No results. Try to use other filters...</div>;
  }

  const renderView = (source: ISource): React.ReactElement | null => (
    <Source key={source.id} source={source} isFavourite={false} />
  );

  return (
    <div className={cls(styles.standartSources)}>{sources.map(source => renderView(source))}</div>
  );
});

export default Sources;
