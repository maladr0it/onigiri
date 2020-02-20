import React from "react";

import { useFoodList } from "../../useFoodList";
import { FoodListItem } from "./FoodListItem";

export const FoodList: React.FC = () => {
  const { isLoading, payload } = useFoodList(null);

  if (!isLoading && payload && payload.length > 0) {
    return (
      <ul>
        {payload.map(
          (item) => item && <FoodListItem key={item.id} {...item} />,
        )}
      </ul>
    );
  }
  if (!isLoading && payload && !payload.length) {
    return <h1>No items added yet</h1>;
  }
  return null;
};
