import firebase from "./firebase";
import "firebase/firestore";

import { dateToTimestamp } from "./utils";

export interface MenuDoc {
  id: string;
  data: {
    date: number;
    items: string[];
  };
}

export interface FoodItemDoc {
  id: string;
  data: {
    name: string;
    imageUrl?: string;
    rating?: number;
  };
}

const db = firebase.firestore();

export const listenForMenu = (
  date: number,
  onChange: (doc: MenuDoc | null) => void,
) => {
  const timestamp = dateToTimestamp(date);

  console.log("listening for menu", date);

  return db
    .collection("menus")
    .where("date", "==", timestamp)
    .onSnapshot((querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })) as MenuDoc[];
      const doc = docs.length > 0 ? docs[0] : null;
      onChange(doc);
    });
};

export const listenForFoodList = (onChange: (docs: FoodItemDoc[]) => void) => {
  return db.collection("foodItems").onSnapshot((querySnapshot) => {
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    })) as FoodItemDoc[];
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
      const doc = {
        id,
        data: docSnapshot.data(),
      } as FoodItemDoc;
      onChange(doc);
    });
};

export const addFoodItem = async (data: FoodItemDoc["data"]) => {
  return db.collection("foodItems").add(data);
};
