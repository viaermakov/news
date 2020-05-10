import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ErrorWrapper } from 'src/components/molecules/error';
import { useStore } from 'src/store';
import { Sources } from 'src/components/organisms/sources';
import { Slider } from 'src/components/molecules/slider';
import { SourceForm } from 'src/components/organisms/form';

const SourcesPage: React.FC = observer(() => {
  const { sources: sourcesStore } = useStore();

  React.useEffect(() => {
    sourcesStore.getSources();
  }, []);

  const {
    statuses: { error, isLoading },
  } = sourcesStore;

  return (
    <div style={{ display: 'flex' }}>
      <ErrorWrapper error={error}>
        <Sources sources={sourcesStore.sources} isLoading={isLoading} />
        <Slider>
          <SourceForm />
        </Slider>
      </ErrorWrapper>
    </div>
  );
});

export default SourcesPage;
