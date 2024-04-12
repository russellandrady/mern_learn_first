// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,//look. here we imported using a different way. Not used process.env. We used import.meta.env.VITE_FIREBASE_API_KEY.
  authDomain: "mern-auth-f0b8f.firebaseapp.com",
  projectId: "mern-auth-f0b8f",
  storageBucket: "mern-auth-f0b8f.appspot.com",
  messagingSenderId: "406290623205",
  appId: "1:406290623205:web:7d259f77331ecb137d820c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);//added export manually here so we can use it other places too