import React from "react";
import styled from "styled-components";

import { useMenuList } from "../useMenuList";
import { WeekViewer } from "../common/WeekViewer";
import { MenuTitle } from "../common/MenuTitle";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const { days, selectedDay, changeDay, isLoading, payload } = useMenuList();

  return (
    <>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={changeDay}
      />
      <MenuTitle day={selectedDay} />
      {!isLoading && payload && payload.items.length > 0 && (
        <ul>
          {payload.items.map((id) => (
            <MenuItem key={id} id={id} />
          ))}
        </ul>
      )}
      {!isLoading && (!payload || payload.items.length === 0) && (
        <h3>There are no items added to the menu yet...</h3>
      )}
    </>
  );
};
