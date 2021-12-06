import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyARdGbMq9uLoCxsk9gz8y365E8CNt3fDPU",
  authDomain: "gb5chat.firebaseapp.com",
  databaseURL: "https://gb5chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gb5chat",
  storageBucket: "gb5chat.appspot.com",
  messagingSenderId: "469582061696",
  appId: "1:469582061696:web:77c3bd5e13dee31eaec665",
  measurementId: "G-PJPEX9D17C",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();
