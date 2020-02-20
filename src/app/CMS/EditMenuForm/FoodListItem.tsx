import React from "react";

import { db } from "../../services";
import { ToggleButton } from "../../common/ToggleButton";
import { FoodItem } from "../../common/FoodItem";

interface Props extends db.FoodItemDoc {}

export const FoodListItem: React.FC<Props> = ({ id, ...rest }) => {
  return (
    <li>
      <FoodItem
        key={id}
        id={id}
        {...rest}
        augment={<ToggleButton name="added" value={id} />}
      />
    </li>
  );
};
