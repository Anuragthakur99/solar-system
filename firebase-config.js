import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnpqyhJdrOR7YyRJjldgfQRWsMSlo",
  authDomain: "solar-system-a0d84.firebaseapp.com",
  projectId: "solar-system-a0d84",
  storageBucket: "solar-system-a0d84.firebasestorage.app",
  messagingSenderId: "233028857745",
  appId: "1:233028857745:web:0b07a366b21ac40b89f430",
  measurementId: "G-9Z01B0R6XQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };
