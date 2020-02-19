import React, { useState, useMemo, useEffect } from "react";

import { db } from "../services";
import { getWeekdays } from "../utils";
import { DaysOfWeek } from "./DaysOfWeek";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  // only get the time on mount
  const week = useMemo(() => getWeekdays(new Date().valueOf()), []);
  const [selectedDay, setSelectedDay] = useState(week[0]);
  const [menuItems, setMenuItems] = useState<string[]>();

  useEffect(() => {
    const unsubsribe = db.listenForMenu(selectedDay, ([menuData]) => {
      setMenuItems(menuData?.items ?? null);
    });

    return unsubsribe;
  }, [selectedDay]);

  return (
    <>
      <h2>Menu Page</h2>
      <DaysOfWeek
        days={week}
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
