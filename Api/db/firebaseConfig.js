// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrweIVc4ENRXzoBQG9WptrFVC1V2gxfWg",
  authDomain: "careerdoorapi.firebaseapp.com",
  databaseURL: "https://careerdoorapi-default-rtdb.firebaseio.com",
  projectId: "careerdoorapi",
  storageBucket: "careerdoorapi.appspot.com",
  messagingSenderId: "620524083670",
  appId: "1:620524083670:web:947a5e9a7b34766192ac77",
  measurementId: "G-JF5PCH808M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);