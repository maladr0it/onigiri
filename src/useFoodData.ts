import { db } from "./services";

import { useSubscription } from "./useSubscription";

export const useFoodData = (id: string) => {
  const state = useSubscription(db.listenForFoodItem, id);
  return state;
};
