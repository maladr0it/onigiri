import { useState, useMemo, useEffect } from "react";

import { db } from "./services";
import { getWeekdays } from "./utils";

export const useWeekView = () => {
  const days = useMemo(() => getWeekdays(new Date().valueOf()), []);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [menuItems, setMenuItems] = useState<string[]>();

  useEffect(() => {
    const unsubsribe = db.listenForMenu(selectedDay, ([menuData]) => {
      setMenuItems(menuData?.items ?? null);
    });

    return unsubsribe;
  }, [selectedDay]);

  return {
    days,
    selectedDay,
    setSelectedDay,
    menuItems,
  };
};
