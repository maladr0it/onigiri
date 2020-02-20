import { useMemo, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { getDay, getWeekdays } from "./utils";
import { useMenuData } from "./useMenuData";

interface RouteParams {
  date: string;
}

export const useMenuList = () => {
  const history = useHistory();
  const match = useRouteMatch<RouteParams>();

  // only get the current time once on mount
  const now = useMemo(() => new Date().valueOf(), []);
  const urlDate = parseInt(match.params.date);
  const selectedDay = getDay(urlDate || now);
  const days = getWeekdays(selectedDay);

  const changeDay = (date: number) => {
    history.push(date.toString());
  };

  useEffect(() => {
    if (!urlDate) {
      history.push(`${match.url}/${selectedDay.toString()}`);
    }
  }, [urlDate]);

  const { isLoading, payload } = useMenuData(selectedDay);

  return {
    days,
    selectedDay,
    changeDay,
    isLoading,
    payload,
  };
};
