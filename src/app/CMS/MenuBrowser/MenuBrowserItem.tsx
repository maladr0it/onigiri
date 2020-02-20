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
}

export const MenuBrowserItem: React.FC<Props> = ({ id }) => {
  const { isLoading, payload } = useFoodData(id);

  return (
    <Item>
      {!isLoading && payload && <FoodItem {...payload} />}
      <div>
        <button>Edit Item</button>
        <button>Remove</button>
      </div>
    </Item>
  );
};
