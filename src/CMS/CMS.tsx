import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { MenuBrowser } from "./MenuBrowser";
import { EditMenuForm } from "./EditMenuForm";
import { EditFoodForm, NewFoodForm } from "./FoodForm";

export const CMS = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/menus/:date?`}>
        <MenuBrowser />
      </Route>
      <Route path={`${match.url}/editmenu/:date`}>
        <EditMenuForm />
      </Route>
      <Route path={`${match.url}/addfood`}>
        <NewFoodForm />
      </Route>
      <Route path={`${match.url}/editfood/:id`}>
        <EditFoodForm />
      </Route>
    </Switch>
  );
};
