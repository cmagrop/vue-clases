// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// New importations to config.js
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdZIfXkQ4OlRnMwuEdlWBuA0lt3mZ_T7A",
  authDomain: "proyecto-firebase-vue-8fd4e.firebaseapp.com",
  projectId: "proyecto-firebase-vue-8fd4e",
  storageBucket: "proyecto-firebase-vue-8fd4e.firebasestorage.app",
  messagingSenderId: "897598087244",
  appId: "1:897598087244:web:3159ddd2aed6209ead94e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 