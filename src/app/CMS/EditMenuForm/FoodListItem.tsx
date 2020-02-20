import React from "react";
import styled from "styled-components";

import { db } from "../../services";
import { ToggleAugment } from "./ToggleAugment";
import { FoodItem } from "../../common/FoodItem";

interface Props extends db.FoodItemDoc {}

export const FoodListItem: React.FC<Props> = ({ id, ...rest }) => {
  return (
    <li>
      <FoodItem
        key={id}
        id={id}
        {...rest}
        augment={<ToggleAugment name="added" value={id} />}
      />
    </li>
  );
};
