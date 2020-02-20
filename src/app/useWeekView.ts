import { useState, useMemo, useEffect } from "react";

import { db } from "./services";
import { getWeekdays } from "./utils";
import { useSubscription } from "./useSubscription";

export const useWeekView = () => {
  const days = useMemo(() => getWeekdays(new Date().valueOf()), []);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const menu = useSubscription(db.listenForMenuByDate, selectedDay);

  return {
    days,
    selectedDay,
    setSelectedDay,
    menu,
  };
};
