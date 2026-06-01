import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8jotLovTAjh0nZEEFo-v9ECiyZXP4axE",
  authDomain: "iacademia-a0f08.firebaseapp.com",
  projectId: "iacademia-a0f08",
  storageBucket: "iacademia-a0f08.firebasestorage.app",
  messagingSenderId: "184474564247",
  appId: "1:184474564247:web:2f4d94693b54073e5e5bd2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;