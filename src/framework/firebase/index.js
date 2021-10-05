// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, serverTimestamp} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRlGRFfLlnMkoYhbsd1q6XHpGjpauoIhs",
  authDomain: "minnuochoa-c24a8.firebaseapp.com",
  projectId: "minnuochoa-c24a8",
  storageBucket: "minnuochoa-c24a8.appspot.com",
  messagingSenderId: "741356781731",
  appId: "1:741356781731:web:c7b6c6898a7721ab2fff16",
  measurementId: "G-XLTBW2XVW3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {
  firestore,
  serverTimestamp
}





