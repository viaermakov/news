import * as React from 'react';
import { Route, RouteProps, BrowserRouter, Redirect } from 'react-router-dom';

const HeadLinesPage = React.lazy(() => import('../pages/main/main'));
const SourcesPage = React.lazy(() => import('../pages/sources/sources'));

const Routes: React.FC<RouteProps> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <Route exact path="/" render={() => <Redirect to="/news" />} />
      <Route exact path="/news" component={HeadLinesPage} />
      <Route exact path="/sources" component={SourcesPage} />
    </React.Suspense>
  </BrowserRouter>
);

export default Routes;
