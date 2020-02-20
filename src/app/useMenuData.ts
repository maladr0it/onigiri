import { db } from "./services";

import { useSubscription } from "./useSubscription";

export const useMenuData = (id: string) => {
  const state = useSubscription(db.listenForMenuById, id);
  return state;
};
