// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn0156H5t2T-vwmDRpngXCnhU3sLAd26o",
  authDomain: "evergreen-5942e.firebaseapp.com",
  projectId: "evergreen-5942e",
  storageBucket: "evergreen-5942e.firebasestorage.app",
  messagingSenderId: "558536642419",
  appId: "1:558536642419:web:b4498e542c63aeb1813f06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
