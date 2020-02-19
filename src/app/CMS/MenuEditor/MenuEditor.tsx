import React from "react";
import styled from "styled-components";

import { useWeekView } from "../../useWeekView";
import { WeekViewer } from "../../common/WeekViewer";
import { MenuItem } from "../../Menu/MenuItem";

const ItemRow = styled.li`
  display: flex;
  align-items: center;
`;

export const MenuEditor = () => {
  const { days, selectedDay, setSelectedDay, menuItems } = useWeekView();

  return (
    <>
      <h1>WEEK_VIEWER</h1>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
      />
      <ul>
        {menuItems &&
          menuItems.map((id) => (
            <ItemRow key={id}>
              <MenuItem key={id} id={id} />
              <button onClick={() => {}}>DELETE</button>
            </ItemRow>
          ))}
      </ul>
    </>
  );
};
