import { useState, useMemo, useEffect } from "react";

import { db } from "./services";
import { getWeekdays } from "./utils";

export const useWeekView = () => {
  const days = useMemo(() => getWeekdays(new Date().valueOf()), []);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [menu, setMenu] = useState<db.MenuDoc | null>(null);

  useEffect(() => {
    const unsubsribe = db.listenForMenu(selectedDay, (doc) => {
      setMenu(doc);
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
