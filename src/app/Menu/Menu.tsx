import React from "react";
import styled from "styled-components";

import { getDayString } from "../utils";
import { useMenuList } from "../useMenuList";
import { WeekViewer } from "../common/WeekViewer";
import { PageHeader } from "../common/PageHeader";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const { days, selectedDay, changeDay, isLoading, payload } = useMenuList();

  return (
    <div>
      <PageHeader title={`${getDayString(selectedDay)}'s Menu`}>
        <WeekViewer
          days={days}
          selectedDay={selectedDay}
          onDayClick={changeDay}
        />
      </PageHeader>
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
    </div>
  );
};
