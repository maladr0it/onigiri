import firebase from "firebase/app";
import "firebase/firestore";

import config from "./config";
import { dateToTimestamp } from "./utils";

firebase.initializeApp(config);

interface MenuDoc {
  date: number;
  items: string[];
}

interface FoodItemDoc {
  name: string;
  rating: number;
}

const db = firebase.firestore();

export const listenForMenu = (
  date: Date,
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

// Get a food item by ID
export const listenForFoodItem = (
  id: string,
  onChange: (doc: FoodItemDoc) => void,
) => {
  return db
    .collection("foodItem")
    .doc(id)
    .onSnapshot((docSnapshot) => {
      const doc = docSnapshot.data() as FoodItemDoc;
      onChange(doc);
    });
};

// export const getMenuData
