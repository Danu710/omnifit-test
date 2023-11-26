import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2PQfT5KozSIfV0f9W-uSRmVPIBjCL8NY",
  authDomain: "my-project-754a5.firebaseapp.com",
  databaseURL:
    "https://my-project-754a5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "my-project-754a5",
  storageBucket: "my-project-754a5.appspot.com",
  messagingSenderId: "465866326742",
  appId: "1:465866326742:web:2c417b20766f9e56693f77",
  measurementId: "G-VDY20YVR8K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
export { database };
export { db };
