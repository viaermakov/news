import * as React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './sources.scss';

import { ErrorWrapper } from 'src/components/error';
import { useStore } from 'src/store';
import { ISource } from 'src/types';
import { NoResults } from 'src/components/no-results';

const SourcesPage: React.FC = observer(() => {
  const { sources: sourcesStore } = useStore();

  React.useEffect(() => {
    sourcesStore.getSources();
  }, []);

  const {
    status: { error, isLoading },
  } = sourcesStore;

  if (isLoading) {
    return <NoResults onClick={() => {}} />;
  }

  return (
    <div className={styles.layout}>
      <ErrorWrapper error={error}>
        {sourcesStore.sources.map((source: ISource) => (
          <div className={styles.source} key={source.id}>
            {source.name}
          </div>
        ))}
      </ErrorWrapper>
    </div>
  );
});

export default SourcesPage;
