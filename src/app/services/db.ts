import firebase from "./firebase";
import "firebase/firestore";

import { dateToTimestamp } from "./utils";

export interface MenuDoc {
  id: string;
  date: number;
  items: string[];
}

export interface FoodItemDoc {
  id: string;
  name: string;
  imageUrl?: string;
  rating?: number;
}

const db = firebase.firestore();

// TODO: genericize the process of checking if data exists

export const listenForMenuByDate = (
  date: number,
  onChange: (doc: MenuDoc | null) => void,
) => {
  const timestamp = dateToTimestamp(date);

  return db
    .collection("menus")
    .where("date", "==", timestamp)
    .onSnapshot((querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<MenuDoc, "id">;
        if (data) {
          return { id: doc.id, ...data };
        } else {
          return null;
        }
      });

      onChange(docs?.[0] ?? null);
    });
};

export const listenForMenuById = (
  id: string,
  onChange: (doc: MenuDoc | null) => void,
) => {
  return db
    .collection("menus")
    .doc(id)
    .onSnapshot((doc) => {
      const data = doc.data() as Omit<MenuDoc, "id">;
      let payload: MenuDoc | null;
      if (data) {
        payload = { id: doc.id, ...data };
      } else {
        payload = null;
      }

      onChange(payload);
    });
};

export const listenForFoodList = (
  _: any,
  onChange: (docs: (FoodItemDoc | null)[]) => void,
) => {
  return db.collection("foodItems").onSnapshot((querySnapshot) => {
    const docs = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<FoodItemDoc, "id">;
      let payload: FoodItemDoc | null;
      if (data) {
        payload = { id: doc.id, ...data };
      } else {
        payload = null;
      }
      return payload;
    });
    onChange(docs);
  });
};

export const listenForFoodItem = (
  id: string,
  onChange: (doc: FoodItemDoc | null) => void,
) => {
  return db
    .collection("foodItems")
    .doc(id)
    .onSnapshot((doc) => {
      const data = doc.data() as Omit<FoodItemDoc, "id">;
      let payload: FoodItemDoc | null;
      if (data) {
        payload = { id, ...data };
      } else {
        payload = null;
      }
      onChange(payload);
    });
};

export const setFoodItem = async (
  foodId: string,
  data: Omit<FoodItemDoc, "id">,
) => {
  return db
    .collection("foodItems")
    .doc(foodId)
    .set(data);
};

export const addFoodItem = async (data: Omit<FoodItemDoc, "id">) => {
  return db.collection("foodItems").add(data);
};

export const setMenuItems = async (menuId: string, items: MenuDoc["items"]) => {
  return db
    .collection("menus")
    .doc(menuId)
    .set({ items }, { merge: true });
};

export const addMenu = (data: Omit<MenuDoc, "id">) => {
  const { date, ...rest } = data;
  return db.collection("menus").add({
    date: dateToTimestamp(date),
    ...rest,
  });
};
