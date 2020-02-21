import React from "react";
import styled from "styled-components";

import { getDayString } from "../utils";
import { useMenuList } from "../useMenuList";
import { WeekViewer } from "../common/WeekViewer";
import { PageHeader } from "../common/PageHeader";
import { FoodList } from "../common/FoodList";
import { VoteAugment } from "./VoteAugment";

const Message = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

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
        <FoodList ids={payload.items} renderAugment={() => <VoteAugment />} />
      )}
      {!isLoading && (!payload || payload.items.length === 0) && (
        <Message>There is no menu for this day</Message>
      )}
    </div>
  );
};
