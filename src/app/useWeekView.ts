import { useState, useMemo, useEffect } from "react";

import { db } from "./services";
import { getWeekdays } from "./utils";

type MenuDoc = db.WithId<db.MenuDoc>;

export const useWeekView = () => {
  const days = useMemo(() => getWeekdays(new Date().valueOf()), []);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [menu, setMenu] = useState<MenuDoc>();

  useEffect(() => {
    const unsubsribe = db.listenForMenu(selectedDay, ([menuDoc]) => {
      setMenu(menuDoc);
    });

    return unsubsribe;
  }, [selectedDay]);

  return {
    days,
    selectedDay,
    setSelectedDay,
    menu,
  };
};
