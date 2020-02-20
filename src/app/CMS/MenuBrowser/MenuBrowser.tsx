import React from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";

import { db } from "../../services";
import { WeekViewer } from "../../common/WeekViewer";
import { MenuBrowserItem } from "./MenuBrowserItem";

interface Props {
  days: number[];
  selectedDay: number;
  onDayClick: (day: number) => void;
  menu: { payload: db.MenuDoc | null; isLoading: boolean; isError: boolean };
}

export const MenuBrowser: React.FC<Props> = ({
  days,
  selectedDay,
  onDayClick,
  menu,
}) => {
  const history = useHistory();
  const match = useRouteMatch();

  const handleAddItemsClick = () => {
    if (menu.payload) {
      history.push(`${match.url}/editmenu/${menu.payload.id}`);
    }
  };

  return (
    <>
      <h1>WEEK_VIEWER</h1>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={onDayClick}
      />
      {!menu.isLoading && menu.payload && (
        <ul>
          {menu.payload.items.map((id) => (
            <MenuBrowserItem key={id} id={id} />
          ))}
        </ul>
      )}
      <button onClick={handleAddItemsClick}>ADD ITEMS</button>
    </>
  );
};
