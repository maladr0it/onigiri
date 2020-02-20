import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { useWeekView } from "../useWeekView";
import { MenuBrowser } from "./MenuBrowser";
import { EditMenuForm } from "./EditMenuForm";
import { EditFoodForm } from "./EditFoodForm";

export const CMS = () => {
  const { days, selectedDay, setSelectedDay, menu } = useWeekView();
  const match = useRouteMatch();

  return (
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
        <EditFoodForm />
      </Route>
    </Switch>
  );
};
