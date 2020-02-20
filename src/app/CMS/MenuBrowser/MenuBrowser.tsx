import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useMenuList } from "../../useMenuList";
import { WeekViewer } from "../../common/WeekViewer";
import { MenuBrowserItem } from "./MenuBrowserItem";
import { db } from "../../services";

interface Props {}

export const MenuBrowser: React.FC<Props> = () => {
  const history = useHistory();
  const { days, selectedDay, changeDay, isLoading, payload } = useMenuList();

  const handleEditMenuClick = () => {
    history.push(`/cms/editmenu/${selectedDay}`);
  };

  const handleItemRemove = (id: string) => {
    // TODO: Always true, unnecessary
    if (payload) {
      const newItems = payload.items.filter((item) => item !== id);
      db.setMenuItems(payload.id, newItems);
    }
  };

  const handleItemEdit = (id: string) => {
    history.push(`/cms/editfood/${id}`);
  };

  return (
    <>
      <h1>WEEK_VIEWER</h1>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={changeDay}
      />
      {!isLoading && payload && (
        <>
          <ul>
            {payload.items.map((id) => (
              <MenuBrowserItem
                key={id}
                id={id}
                onEditClick={() => handleItemEdit(id)}
                onRemoveClick={() => handleItemRemove(id)}
              />
            ))}
          </ul>
          <button onClick={handleEditMenuClick}>ADD MORE ITEMS</button>
        </>
      )}
      {!isLoading && !payload && (
        <>
          <h2>THERE ARE NO ITEMS</h2>
          <button onClick={handleEditMenuClick}>CREATE MENU</button>
        </>
      )}
    </>
  );
};
