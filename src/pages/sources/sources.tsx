import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ErrorWrapper } from 'src/components/error';
import { useStore } from 'src/store';
import { Sources } from 'src/components/sources';

const SourcesPage: React.FC = observer(() => {
  const { sources: sourcesStore } = useStore();

  React.useEffect(() => {
    sourcesStore.getSources();
  }, []);

  const {
    status: { error, isLoading },
  } = sourcesStore;

  return (
    <ErrorWrapper error={error}>
      <Sources sources={sourcesStore.sources} isLoading={isLoading} />
    </ErrorWrapper>
  );
});

export default SourcesPage;
