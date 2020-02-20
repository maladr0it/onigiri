import React, { useState, useEffect } from "react";

import { db } from "../../services";
import { FoodListItem } from "./FoodListItem";

type FoodDoc = db.FoodItemDoc;

export const FoodList = () => {
  const [items, setItems] = useState<FoodDoc[]>();

  useEffect(() => {
    const unsubscribe = db.listenForFoodList((list) => {
      setItems(list);
    });
    return unsubscribe;
  }, []);

  return (
    <ul>
      {items?.map((item) => (
        <FoodListItem key={item.id} id={item.id} data={item.data} />
      ))}
    </ul>
  );
};
