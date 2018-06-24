import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import App from './containers/App/App';
import { SignInPage, BrandingPage } from './containers/Page';
import './styles/styles.less';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

const PublicRoutes = ({ history, isLoggedIn }) => (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={BrandingPage} />
        <Route exact path="/signin" component={SignInPage} />
        <RestrictedRoute path="/dashboard" component={App} isLoggedIn={isLoggedIn} />
      </Switch>
    </div>
  </ConnectedRouter>
);
const mapStateToProps = (state) => {
  const { Auth } = state;
  return {
    isLoggedIn: Auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(PublicRoutes);
