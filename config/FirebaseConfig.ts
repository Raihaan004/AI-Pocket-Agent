// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCad9orMdYDss7Im4VXD9fPT-gjK8jAtgM",
  authDomain: "ai-pocket-agent-bd869.firebaseapp.com",
  projectId: "ai-pocket-agent-bd869",
  storageBucket: "ai-pocket-agent-bd869.firebasestorage.app",
  messagingSenderId: "662465022941",
  appId: "1:662465022941:web:1bc31826fb035c3917c434",
  measurementId: "G-75Z2CJVMLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(app);