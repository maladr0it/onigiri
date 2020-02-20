import React from "react";
import styled from "styled-components";

import { useFoodData } from "../useFoodData";
import { FoodItem } from "../common/FoodItem";

interface Props {
  id: string;
}

export const MenuItem: React.FC<Props> = ({ id }) => {
  const { isLoading, payload } = useFoodData(id);
  return <li>{!isLoading && payload && <FoodItem {...payload} />}</li>;
};
