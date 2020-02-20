import React from "react";
import styled from "styled-components";

import { useFoodData } from "../../useFoodData";
import { FoodItem } from "../../common/FoodItem";

const RemoveButton = styled.button`
  height: 2rem;
  width: 2rem;
  padding: 0;
  font-size: 1rem;
  border: none;
  border-radius: 50%;
  background-color: #ff3975;
  color: #fff;
`;

interface Props {
  id: string;
  onRemoveClick: () => void;
}

export const MenuBrowserItem: React.FC<Props> = ({ id, onRemoveClick }) => {
  const { isLoading, payload } = useFoodData(id);

  if (!isLoading && payload) {
    return (
      <li>
        <FoodItem
          {...payload}
          augment={<RemoveButton onClick={onRemoveClick}>X</RemoveButton>}
        />
      </li>
    );
  }
  return null;
};
