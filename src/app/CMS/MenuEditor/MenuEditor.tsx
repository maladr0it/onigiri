import React, { useEffect } from "react";

import { useWeekView } from "../../useWeekView";
import { WeekViewer } from "../../common/WeekViewer";

export const MenuEditor = () => {
  const { days, selectedDay, setSelectedDay, menuItems } = useWeekView();

  return (
    <>
      <h1>WEEK_VIEWER</h1>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
      />

      {menuItems?.length || 0}
    </>
  );
};
