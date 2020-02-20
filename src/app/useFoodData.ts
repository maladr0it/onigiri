import { useState, useEffect } from "react";

import { db } from "./services";

export const useFoodData = (id: string) => {
  const [data, setData] = useState<db.FoodItemDoc["data"] | null>(null);

  useEffect(() => {
    const unsubscribe = db.listenForFoodItem(id, (doc) => {
      setData(doc.data);
    });
    return unsubscribe;
  }, [id]);

  return { data };
};
