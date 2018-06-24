// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Settings, Patients, Calendar, Components, Inventory, IPDManage } from '../Page/';

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
      <Route path={`${url}/inventory`} component={Inventory} />
      <Route path={`${url}/ipd`} component={IPDManage} />
    </Switch>
  );
}

export default AppRouter;
