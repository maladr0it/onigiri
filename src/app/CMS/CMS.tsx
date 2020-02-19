import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

import { MenuEditor } from "./MenuEditor";

import { EditItemForm } from "./EditItemForm";
import { FoodList } from "./FoodList";

export const CMS = () => {
  const match = useRouteMatch();

  return (
    <>
      <h2>CMS Page</h2>
      <hr />
      <Switch>
        <Route exact path={`${match.url}`}>
          <MenuEditor />
        </Route>
        <Route path={`${match.url}/editmenu/:id`}>
          <h1>EDIT MENU</h1>
        </Route>
        <Route path={`${match.url}/editfood/:id`}>
          <EditItemForm />
        </Route>
      </Switch>
    </>
  );
};
