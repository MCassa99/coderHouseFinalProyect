// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAewg81p7rJNorsDPeV4fWWhyTMLeNJotU",
  authDomain: "travelvip-397815.firebaseapp.com",
  projectId: "travelvip-397815",
  storageBucket: "travelvip-397815.appspot.com",
  messagingSenderId: "479520458952",
  appId: "1:479520458952:web:08f4b9edcd260b3eb33dfd",
  measurementId: "G-X61Q0CERH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);