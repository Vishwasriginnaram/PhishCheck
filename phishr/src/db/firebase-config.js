
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ADD YOUR OWN FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyD3_S8DcIPKqurf_SbJ0Rivvz0xpP9Bv8s",
  authDomain: "phishing-website-detecti-4f2d5.firebaseapp.com",
  projectId: "phishing-website-detecti-4f2d5",
  storageBucket: "phishing-website-detecti-4f2d5.firebasestorage.app",
  messagingSenderId: "455689215219",
  appId: "1:455689215219:web:c188e60cb6733550956b86",
  measurementId: "G-ZP2QMKHD0C"
};


// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore
export const db = getFirestore(firebaseApp);
export { auth, googleAuthProvider };
