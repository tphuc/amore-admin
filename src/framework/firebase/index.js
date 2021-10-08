// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, serverTimestamp} from 'firebase/firestore'

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk_3AMiobPw-s67gztgHuytgwV02K3gsU",
  authDomain: "minnuochoa-b25b9.firebaseapp.com",
  projectId: "minnuochoa-b25b9",
  storageBucket: "minnuochoa-b25b9.appspot.com",
  messagingSenderId: "18360930051",
  appId: "1:18360930051:web:34141b90fa44a1d9b86336",
  measurementId: "G-M7PLY74J6C"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app)

export {
  firestore,
  auth,
  serverTimestamp
}





