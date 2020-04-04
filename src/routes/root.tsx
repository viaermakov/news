import * as React from 'react';
import { Route, RouteProps, BrowserRouter, Redirect } from 'react-router-dom';

const MobxPage = React.lazy(() => import('../pages/main/main'));

const Routes: React.FC<RouteProps> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Загрузка...</div>}>
        <Route exact path="/" render={() => <Redirect to="/news" />} />
        <Route exact path="/news" component={MobxPage} />
    </React.Suspense>
  </BrowserRouter>
);

export default Routes;
