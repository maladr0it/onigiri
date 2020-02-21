import React from "react";
import styled from "styled-components";

import { db } from "../services";
import { FoodItem } from "../common/FoodItem";

const List = styled.ul`
  margin: 0 0.25rem;
  & > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

interface Props {
  ids: string[];
  renderAugment: (data: db.FoodItemDoc) => React.ReactNode;
  editable?: boolean;
}

export const FoodList: React.FC<Props> = ({ ids, renderAugment, editable }) => {
  return (
    <List>
      {ids.map((id) => (
        <FoodItem
          key={id}
          id={id}
          renderAugment={renderAugment}
          editable={editable}
        />
      ))}
    </List>
  );
};
