import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { getDayString } from "../../utils";
import { db } from "../../services";
import { useMenuList } from "../../useMenuList";
import { PageHeader } from "../../common/PageHeader";
import { PageFooter } from "../../common/PageFooter";
import { WeekViewer } from "../../common/WeekViewer";
import { PrimaryButton } from "../../common/PrimaryButton";
import { FoodList } from "../../common/FoodList";
import { RemoveAugment } from "./RemoveAugment";

interface Props {}

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 0.5rem;
`;

const ActionButton = styled(PrimaryButton)`
  margin: 0.5rem 2rem;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 2rem;
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
    <>
      <PageHeader title={`Edit ${getDayString(selectedDay)}'s Menu`}>
        <WeekViewer
          days={days}
          selectedDay={selectedDay}
          onDayClick={changeDay}
        />
      </PageHeader>
      <Content>
        {!isLoading && payload && payload.items.length > 0 && (
          <>
            <FoodList
              ids={payload.items}
              renderAugment={(data) => (
                <RemoveAugment onClick={() => handleItemRemove(data.id)} />
              )}
              editable
            />
            <PageFooter>
              <ActionButton onClick={handleEditMenuClick}>
                Add More Items
              </ActionButton>
            </PageFooter>
          </>
        )}
        {!isLoading && (!payload || payload.items.length === 0) && (
          <>
            <Message>There is no menu for this day</Message>
            <PageFooter>
              <ActionButton onClick={handleEditMenuClick}>
                Create Menu
              </ActionButton>
            </PageFooter>
          </>
        )}
      </Content>
    </>
  );
};
