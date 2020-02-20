import React from "react";
import styled from "styled-components";

import { useFoodData } from "../../useFoodData";
import { FoodItem } from "../../common/FoodItem";

const Item = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  grid-gap: 0.5rem;
`;

interface Props {
  id: string;
  onEditClick: () => void;
  onRemoveClick: () => void;
}

export const MenuBrowserItem: React.FC<Props> = ({
  id,
  onEditClick,
  onRemoveClick,
}) => {
  const { isLoading, payload } = useFoodData(id);

  return !isLoading && payload ? (
    <Item>
      <FoodItem {...payload} />
      <div>
        <button onClick={onEditClick}>Edit Item</button>
        <button onClick={onRemoveClick}>Remove</button>
      </div>
    </Item>
  ) : null;
};
