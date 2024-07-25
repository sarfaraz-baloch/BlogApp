import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";


//get auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// console.log(provider)

// fireStore
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  deleteDoc,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

//Stroage
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOxp6g90e0Iyl_jjT72Ey_wVjtQNO28T8",
  authDomain: "authapp-6bef7.firebaseapp.com",
  projectId: "authapp-6bef7",
  storageBucket: "authapp-6bef7.appspot.com",
  messagingSenderId: "78450212090",
  appId: "1:78450212090:web:778646269011ed23addd43",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
  db,
  storage,
  auth,
  addDoc,
  collection,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  signInWithEmailAndPassword,  
  getDoc,
  getFirestore,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp 
   
};
// function getusers() {
    
// }


// getusers()