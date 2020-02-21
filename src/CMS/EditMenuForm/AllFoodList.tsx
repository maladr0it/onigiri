import React from "react";

import { useFoodList } from "../../useFoodList";
import { FoodList } from "../../common/FoodList";
import { ToggleAugment } from "./ToggleAugment";

export const AllFoodList: React.FC = () => {
  const { isLoading, payload } = useFoodList(null);

  if (!isLoading && payload && payload.length > 0) {
    return (
      <FoodList
        ids={payload}
        renderAugment={(data) => <ToggleAugment name="added" value={data.id} />}
        editable
      />
    );
  }
  if (!isLoading && payload && !payload.length) {
    return <h1>No items added yet</h1>;
  }
  return null;
};
