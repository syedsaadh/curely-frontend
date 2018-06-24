// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Labs, Departments, Procedures, PracticeStaff, DrugCatalog } from '../../index';

type Props = {
  url: string,
};
function IRouter(props: Props) {
  const { url } = props;
  return (
    <Switch>
      <Route exact path={`${url}`} component={Departments} />
      <Route exact path={`${url}/departments`} component={Departments} />
      <Route exact path={`${url}/labs`} component={Labs} />
      <Route exact path={`${url}/procedures`} component={Procedures} />
      <Route exact path={`${url}/practicestaff`} component={PracticeStaff} />
      <Route exact path={`${url}/drugcatalog`} component={DrugCatalog} />
    </Switch>
  );
}

export default IRouter;
