// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlw-AWszf56-Ss_gUAE59p4DyN4v9UKZU",
  authDomain: "todo-app-ed040.firebaseapp.com",
  projectId: "todo-app-ed040",
  storageBucket: "todo-app-ed040.appspot.com",
  messagingSenderId: "146005913102",
  appId: "1:146005913102:web:8383faf416bb57cffd165f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider(app)

export {auth, googleProvider, db};