import React from "react";

import { useWeekView } from "../useWeekView";
import { WeekViewer } from "../common/WeekViewer";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const { days, selectedDay, setSelectedDay, menu } = useWeekView();

  return (
    <>
      <h2>Menu Page</h2>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
      />
      {menu && (
        <ul>
          {menu.data.items.map((id) => (
            <MenuItem key={id} id={id} />
          ))}
        </ul>
      )}
    </>
  );
};
