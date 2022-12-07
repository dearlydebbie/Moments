// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8hhxFIWqHPtixVytUbQRZnpDHHU4HNX0",
  authDomain: "my-hub-11afd.firebaseapp.com",
  projectId: "my-hub-11afd",
  storageBucket: "my-hub-11afd.appspot.com",
  messagingSenderId: "519727879652",
  appId: "1:519727879652:web:fdad2ade645886292363f1",
  measurementId: "G-VN4H7N1Y69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const initFirebase = () => {
  return app
}

export const myAuth = getAuth()
