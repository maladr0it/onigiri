import React from "react";

import { useFoodList } from "../../useFoodList";
import { FoodListItem } from "./FoodListItem";

export const FoodList = () => {
  const { isLoading, payload } = useFoodList(null);

  return (
    <ul>
      {!isLoading &&
        payload &&
        payload.map((item) => item && <FoodListItem key={item.id} {...item} />)}
    </ul>
  );
};
