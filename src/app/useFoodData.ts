import { useState, useEffect } from "react";

import { db } from "./services";

export const useFoodData = (id: string) => {
  const [data, setData] = useState<db.FoodItemDoc>();

  useEffect(() => {
    const unsubscribe = db.listenForFoodItem(id, setData);
    return unsubscribe;
  }, [id]);

  return { data };
};
