import firebase from "./firebase";
import "firebase/firestore";

import { dateToTimestamp } from "./utils";

export type WithId<T extends {}> = {
  id: string;
  data: T;
};

export interface MenuDoc {
  date: number;
  items: string[];
}

export interface FoodItemDoc {
  name: string;
  imageUrl?: string;
  rating?: number;
}

const db = firebase.firestore();

export const listenForMenu = (
  date: number,
  onChange: (docs: MenuDoc[]) => void,
) => {
  const timestamp = dateToTimestamp(date);

  return db
    .collection("menus")
    .where("date", "==", timestamp)
    .onSnapshot((querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => doc.data()) as MenuDoc[];
      onChange(docs);
    });
};

export const listenForFoodList = (
  onChange: (docs: WithId<FoodItemDoc>[]) => void,
) => {
  return db.collection("foodItems").onSnapshot((querySnapshot) => {
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    })) as WithId<FoodItemDoc>[];
    onChange(docs);
  });
};

export const listenForFoodItem = (
  id: string,
  onChange: (doc: FoodItemDoc) => void,
) => {
  return db
    .collection("foodItems")
    .doc(id)
    .onSnapshot((docSnapshot) => {
      const doc = docSnapshot.data() as FoodItemDoc;
      onChange(doc);
    });
};

export const addFoodItem = async (data: FoodItemDoc) => {
  return db.collection("foodItems").add(data);
};
