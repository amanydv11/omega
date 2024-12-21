// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "omega-2ec1c.firebaseapp.com",
  projectId: "omega-2ec1c",
  storageBucket: "omega-2ec1c.firebasestorage.app",
  messagingSenderId: "1009570511050",
  appId: "1:1009570511050:web:a7edeb949c511bcf80dc33",
  measurementId: "G-TQ1R5RWD06"
};
 export const app = initializeApp(firebaseConfig);
