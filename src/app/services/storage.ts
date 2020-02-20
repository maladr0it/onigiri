import firebase from "./firebase";
import "firebase/storage";

import uuid from "uuid/v4";

const storage = firebase.storage();
const storageRef = storage.ref();
const menuItemsRef = storageRef.child("menuItems");

export const uploadMenuItem = async (file: File) => {
  const name = uuid();
  const snapshot = await menuItemsRef.child(name).put(file);
  return snapshot.ref.getDownloadURL();
};
