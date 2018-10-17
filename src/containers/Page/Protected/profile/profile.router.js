// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyProfile from './profile.main';
import ChangePassword from './profile.password';

type Props = {
  url: string,
};
function IRouter(props: Props) {
  const { url } = props;
  return (
    <Switch>
      <Route exact path={`${url}`} component={MyProfile} />
      <Route exact path={`${url}/password`} component={ChangePassword} />
    </Switch>
  );
}

export default IRouter;
