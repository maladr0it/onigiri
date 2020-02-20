import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useMenuList } from "../../useMenuList";
import { WeekViewer } from "../../common/WeekViewer";
import { MenuTitle } from "../../common/MenuTitle";
import { MenuBrowserItem } from "./MenuBrowserItem";
import { db } from "../../services";

interface Props {}

const Container = styled.div`
  min-height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

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

  return (
    <Container>
      <WeekViewer
        days={days}
        selectedDay={selectedDay}
        onDayClick={changeDay}
      />
      <div>
        <MenuTitle day={selectedDay} />
        {!isLoading && payload && payload.items.length > 0 && (
          <>
            <ul>
              {payload.items.map((id) => (
                <MenuBrowserItem
                  key={id}
                  id={id}
                  onRemoveClick={() => handleItemRemove(id)}
                />
              ))}
            </ul>
            <button onClick={handleEditMenuClick}>ADD MORE ITEMS</button>
          </>
        )}
        {!isLoading && (!payload || payload.items.length === 0) && (
          <>
            <p>There is no menu for today</p>
            <button onClick={handleEditMenuClick}>CREATE MENU</button>
          </>
        )}
      </div>
    </Container>
  );
};
