// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BlankPage, Settings, Patients, Calendar, Components } from '../Page/';

type Props = {
  url: string,
};
function AppRouter(props: Props) {
  const { url } = props;
  return (
    <Switch>
      <Route exact path={`${url}`} component={Calendar} />
      <Route path={`${url}/patients`} component={Patients} />
      <Route path={`${url}/settings`} component={Settings} />
      <Route path={`${url}/calendar`} component={Calendar} />
      <Route path={`${url}/components`} component={Components} />
    </Switch>
  );
}

export default AppRouter;
