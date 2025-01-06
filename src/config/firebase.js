import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDd8mxHxXduxxeU1n8Lbwown3_kTgJrXEI",
  authDomain: "netflix-clone-2fd96.firebaseapp.com",
  projectId: "netflix-clone-2fd96",
  storageBucket: "netflix-clone-2fd96.firebasestorage.app",
  messagingSenderId: "442819453803",
  appId: "1:442819453803:web:39ab41244233d5e24b622e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);