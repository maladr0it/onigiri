import firebase from "./firebase";
import "firebase/storage";

const storage = firebase.storage();
const storageRef = storage.ref();
const menuItemsRef = storageRef.child("menuItems");

export const uploadMenuItem = async (file: File) => {
  const snapshot = await menuItemsRef.put(file);
  return snapshot.ref.getDownloadURL();
};
