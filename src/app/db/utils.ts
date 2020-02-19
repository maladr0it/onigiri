import firebase from "firebase/app";

const Timestamp = firebase.firestore.Timestamp;

export const dateToTimestamp = (date: Date) => {
  const ms = new Date(date).setHours(0, 0, 0, 0);
  return new Timestamp(ms / 1000, 0);
};
