import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQuLL-eJL8Dd5NOh0t_lbei2HMjFb4j8o",
  authDomain: "instagram-d4ff3.firebaseapp.com",
  projectId: "instagram-d4ff3",
  storageBucket: "instagram-d4ff3.appspot.com",
  messagingSenderId: "815378804875",
  appId: "1:815378804875:web:ff3ab251614bfe7d16248e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()