import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { useWeekView } from "../useWeekView";
import { MenuBrowser } from "./MenuBrowser";
import { EditMenuForm } from "./EditMenuForm";
import { EditItemForm } from "./EditItemForm";

export const CMS = () => {
  const { days, selectedDay, setSelectedDay, menu } = useWeekView();
  const match = useRouteMatch();

  return (
    <>
      <h2>CMS Page</h2>
      <hr />
      <Switch>
        <Route exact path={`${match.url}`}>
          <MenuBrowser
            days={days}
            selectedDay={selectedDay}
            onDayClick={setSelectedDay}
            menu={menu}
          />
        </Route>
        <Route path={`${match.url}/editmenu/:id`}>
          <EditMenuForm />
        </Route>
        <Route path={`${match.url}/editfood/:id`}>
          <EditItemForm />
        </Route>
      </Switch>
    </>
  );
};
