// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQGD_9qURPH74OoWu05BUKkU9TKDugU3g",
  authDomain: "blogapp-7b98a.firebaseapp.com",
  projectId: "blogapp-7b98a",
  storageBucket: "blogapp-7b98a.appspot.com",
  messagingSenderId: "844180117087",
  appId: "1:844180117087:web:21d9d0a10f7f95e2a26dea",
  measurementId: "G-PDQJPKZ995"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();