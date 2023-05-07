// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNINB3RBIotD9bf-DmmZruDNxuDS2uWuo",
  authDomain: "oz-b1c22.firebaseapp.com",
  projectId: "oz-b1c22",
  storageBucket: "oz-b1c22.appspot.com",
  messagingSenderId: "1060738267253",
  appId: "1:1060738267253:web:e678db12f7219c4ccf603c",
  measurementId: "G-K87BHKKQDK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
