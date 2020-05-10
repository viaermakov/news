import * as React from 'react';

import { Source } from './source';
import { ISource } from 'src/types';
import { observer } from 'mobx-react-lite';

import styles from './sources.scss';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

interface ISourcesComponentProps {
  sources: ISource[];
  favouritesIds?: number[];
  isLoading: boolean;
  onAddFavourite?: (id: number) => void;
}

const Sources: React.FC<ISourcesComponentProps> = observer(({ sources, isLoading }) => {
  const [page, setPage] = React.useState<number>(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!sources || sources.length === 0) {
    return <div>No results. Try to use other filters...</div>;
  }

  const renderView = (source: ISource): React.ReactElement | null => (
    <Source key={source.id} source={source} isFavourite={false} />
  );

  const renderPage = () => (
    <div className={styles.standartSources}>
      {sources.slice(page * 10, (page + 1) * 10).map(source => renderView(source))}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={page} classNames={{ ...styles }} timeout={300}>
            <div className={styles.block}>{renderPage()}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div>
        <button onClick={() => setPage(page - 1)}>{'<-'}</button>
        {page}
        <button onClick={() => setPage(page + 1)}>{'->'}</button>
      </div>
    </div>
  );
});

export default Sources;
