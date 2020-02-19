import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { useWeekView } from "../useWeekView";
import { MenuBrowser } from "./MenuBrowser";
import { EditItemForm } from "./EditItemForm";
// import { FoodList } from "./FoodList";

export const CMS = () => {
  const { days, selectedDay, setSelectedDay, menu } = useWeekView();
  const match = useRouteMatch();

  console.log(menu);

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
        <Route path={`${match.url}/editmenu`}>
          <h1>EDIT MENU</h1>
        </Route>
        <Route path={`${match.url}/editfood/:id`}>
          <EditItemForm />
        </Route>
      </Switch>
    </>
  );
};
