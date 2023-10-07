import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5cUUvlTX2U3cttAsD84juY4iL1ptxpkU",
  authDomain: "sign-in-de497.firebaseapp.com",
  projectId: "sign-in-de497",
  storageBucket: "sign-in-de497.appspot.com",
  messagingSenderId: "336498765175",
  appId: "1:336498765175:web:f47a0b8b45742ebe134572"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
