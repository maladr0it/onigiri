import { db } from "./services";

import { useSubscription } from "./useSubscription";

export const useMenuData = (date: number) => {
  const state = useSubscription(db.listenForMenuByDate, date);
  return state;
};
