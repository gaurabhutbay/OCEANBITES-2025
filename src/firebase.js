// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdauJGLn281-93lI7njgq47HeU4b2ntTQ",
  authDomain: "ocean-bites-30ecc.firebaseapp.com",
  projectId: "ocean-bites-30ecc",
  storageBucket: "ocean-bites-30ecc.appspot.com",
  messagingSenderId: "744209164728",
  appId: "1:744209164728:web:2be19057cebd0cd632474d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;