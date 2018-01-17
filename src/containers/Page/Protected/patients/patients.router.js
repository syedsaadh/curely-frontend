// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PatientsBlank from './patients.blank';
import PatientsDetails from './patients.details';

type Props = {
  url: string,
};
function IRouter(props: Props) {
  const { url } = props;
  return (
    <Switch>
      <Route exact path={`${url}`} component={PatientsBlank} />
      <Route exact path={`${url}/:id`} component={PatientsDetails} />
    </Switch>
  );
}

export default IRouter;
