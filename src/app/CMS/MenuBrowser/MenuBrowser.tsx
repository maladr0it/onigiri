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
  menu: db.MenuDoc | null;
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
    if (menu) {
      history.push(`${match.url}/editmenu/${menu.id}`);
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
      {menu && (
        <ul>
          {menu.data.items.map((id) => (
            <MenuBrowserItem key={id} id={id} />
          ))}
        </ul>
      )}
      <button onClick={handleAddItemsClick}>ADD ITEMZ</button>
    </>
  );
};
