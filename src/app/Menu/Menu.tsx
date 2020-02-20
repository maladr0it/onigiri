import React from "react";

import { useMenuList } from "../useMenuList";
import { WeekViewer } from "../common/WeekViewer";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const { days, selectedDay, changeDay, isLoading, payload } = useMenuList();

  return (
    <>
      <h2>Menu Page</h2>
      <hr />
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={changeDay}
      />
      {!isLoading && payload && (
        <ul>
          {payload.items.map((id) => (
            <MenuItem key={id} id={id} />
          ))}
          {selectedDay}
        </ul>
      )}
      {!isLoading && !payload && (
        <h3>There are no items added to the menu yet...</h3>
      )}
    </>
  );
};
