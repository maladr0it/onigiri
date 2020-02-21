import { db } from "./services";

import { useSubscription } from "./useSubscription";

export const useFoodList = (_: any) => {
  const state = useSubscription(db.listenForFoodList, _);
  return state;
};
