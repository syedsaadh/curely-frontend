import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InventoryNew from './inventory.new';
import inventoryDetails from './inventory.details';
import InventoryItemDetails from './inventory.item.details';
import InventoryEdit from './inventory.edit';

type Props = {
  url: string,
};
function IRouter(props: Props) {
  const { url } = props;
  return (
    <Switch>
      <Route exact path={`${url}`} component={inventoryDetails} />
      <Route exact path={`${url}/new`} component={InventoryNew} />
      <Route exact path={`${url}/details/:id`} component={InventoryItemDetails} />
      <Route exact path={`${url}/edit/:id`} component={InventoryEdit} />
    </Switch>
  );
}

export default IRouter;
