import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ErrorWrapper } from 'src/components/error';
import { useStore } from 'src/store';
import { Sources } from 'src/components/sources';
import { Slider } from 'src/components/slider';

const SourcesPage: React.FC = observer(() => {
  const { sources: sourcesStore } = useStore();

  React.useEffect(() => {
    sourcesStore.getSources();
  }, []);

  const {
    status: { error, isLoading },
  } = sourcesStore;

  return (
    <div style={{ display: 'flex' }}>
      <ErrorWrapper error={error}>
        <Sources sources={sourcesStore.sources} isLoading={isLoading} />
        <Slider />
      </ErrorWrapper>
    </div>
  );
});

export default SourcesPage;
