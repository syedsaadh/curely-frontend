import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './config/store';
import PublicRoutes from './router';
import './styles/styles.less';

const DashApp = () => (
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>
);

export default DashApp;
