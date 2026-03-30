// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL1buHCUpDcP5zKErbm99ZM6PgXw8faTU",
  authDomain: "fiap-auth-6c008.firebaseapp.com",
  projectId: "fiap-auth-6c008",
  storageBucket: "fiap-auth-6c008.firebasestorage.app",
  messagingSenderId: "310132053751",
  appId: "1:310132053751:web:9a53bc786f88eef94765f2",
  measurementId: "G-1EVM0CFG8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);