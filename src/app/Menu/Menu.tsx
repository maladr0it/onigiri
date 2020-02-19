import React from "react";

import { useWeekView } from "../useWeekView";
import { WeekViewer } from "../common/WeekViewer";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const { days, selectedDay, setSelectedDay, menuItems } = useWeekView();

  return (
    <>
      <h2>Menu Page</h2>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
      />
      {menuItems && (
        <ul>
          {menuItems.map((id) => (
            <MenuItem key={id} id={id} />
          ))}
        </ul>
      )}
    </>
  );
};
