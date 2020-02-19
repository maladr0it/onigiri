import React, { useState, useMemo } from "react";

import { getWeekdays } from "../utils";
import { DaysOfWeek } from "./DaysOfWeek";

export const Menu = () => {
  // only get the time on mount
  const week = useMemo(() => getWeekdays(new Date().valueOf()), []);
  const [selectedDay, setSelectedDay] = useState(week[0]);

  return (
    <>
      <h2>Menu Page</h2>
      <DaysOfWeek
        days={week}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
      />
    </>
  );
};
