import React from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";

import { db } from "../../services";
import { useWeekView } from "../../useWeekView";
import { WeekViewer } from "../../common/WeekViewer";
import { MenuBrowserItem } from "./MenuBrowserItem";

interface Props {
  days: number[];
  selectedDay: number;
  onDayClick: (day: number) => void;
  menu?: db.WithId<db.MenuDoc>;
}

export const MenuBrowser: React.FC<Props> = ({
  days,
  selectedDay,
  onDayClick,
  menu,
}) => {
  // const { days, selectedDay, setSelectedDay, menu } = useWeekView();
  const history = useHistory();
  const match = useRouteMatch();

  return (
    <>
      <h1>WEEK_VIEWER</h1>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={onDayClick}
      />
      <ul>
        {menu &&
          menu.data.items.map((id) => <MenuBrowserItem key={id} id={id} />)}
      </ul>
      <hr />
      <button
        onClick={() => {
          history.push(`${match.url}/editmenu`);
        }}
      >
        ADD ITEMS
      </button>
    </>
  );
};
