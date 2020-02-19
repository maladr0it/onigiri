import React, { useState, useEffect } from "react";

import { db } from "../services";
import { FoodItem } from "./FoodItem";

type FoodDoc = db.WithId<db.FoodItemDoc>;

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
        <FoodItem key={item.id} {...item.data} />
      ))}
    </ul>
  );
};
