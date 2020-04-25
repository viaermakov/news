import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Routes from './routes/root';
import { rootStore, Provider } from './store';
import './index.scss';

const App = () => (
  <Provider value={rootStore}>
    <Routes />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
