import React from "react";

import { useWeekView } from "../useWeekView";
import { WeekViewer } from "../common/WeekViewer";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const { days, selectedDay, setSelectedDay, menu } = useWeekView();

  return (
    <>
      <h2>Menu Page</h2>
      <hr />
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
      />
      {!menu.isLoading && menu.payload && (
        <ul>
          {menu.payload.items.map((id) => (
            <MenuItem key={id} id={id} />
          ))}
          {selectedDay}
        </ul>
      )}
    </>
  );
};
