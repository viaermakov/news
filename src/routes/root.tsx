import * as React from 'react';
import { Route, RouteProps, BrowserRouter, Redirect } from 'react-router-dom';

const MobxPage = React.lazy(() => import('../containers/mainMobx/main'));

const Routes: React.FC<RouteProps> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Загрузка...</div>}>
        <Route exact path="/" render={() => <Redirect to="/redux" />} />
        <Route exact path="/mobx" component={MobxPage} />
    </React.Suspense>
  </BrowserRouter>
);

export default Routes;
