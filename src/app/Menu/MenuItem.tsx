import React from "react";
import styled from "styled-components";

import { useFoodData } from "../useFoodData";
import { FoodItem } from "../common/FoodItem";

interface Props {
  id: string;
}

export const MenuItem: React.FC<Props> = ({ id }) => {
  const { data } = useFoodData(id);
  return (
    <li>
      <FoodItem id={id} data={data} />
    </li>
  );
};
