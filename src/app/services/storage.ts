import firebase from "./firebase";
import "firebase/storage";

const storage = firebase.storage();
const storageRef = storage.ref();
const menuItemsRef = storageRef.child("menuItems");

console.log(menuItemsRef);

export const test = 5;
