import React from "react";
import styled from "styled-components";

import { useFoodData } from "../useFoodData";
import { FoodItem } from "../common/FoodItem";
import { VoteAugment } from "./VoteAugment";

interface Props {
  id: string;
}

export const MenuItem: React.FC<Props> = ({ id }) => {
  const { payload, isLoading } = useFoodData(id);
  return (
    <li>
      {!isLoading && payload && (
        <FoodItem {...payload} augment={<VoteAugment />} />
      )}
    </li>
  );
};
