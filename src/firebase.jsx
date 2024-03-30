// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByKudEGV7FseBEDypvRhCkwN4UkjYeESU",
  authDomain: "akatsuki-4d54a.firebaseapp.com",
  projectId: "akatsuki-4d54a",
  storageBucket: "akatsuki-4d54a.appspot.com",
  messagingSenderId: "1029630894622",
  appId: "1:1029630894622:web:db288b1f7dd3e5d0d6040f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);