import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth';
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  setDoc
} from "firebase/firestore"

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyDM1FAP33G4QiYeB0y8coTB6haQbE1QT2o",
  authDomain: "nomad-a1fa3.firebaseapp.com",
  projectId: "nomad-a1fa3",
  storageBucket: "nomad-a1fa3.appspot.com",
  messagingSenderId: "363966363314",
  appId: "1:363966363314:web:65ab169576a5bd80da7bab",
  measurementId: "G-8RWYKHHP09"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const db = getFirestore(FIREBASE_APP)
const auth = getAuth(FIREBASE_APP)



  export {
    auth,
    db
  };


  //IOS: 105772593651-2tepdb024f148gc01ru6ssuhrcanhj5r.apps.googleusercontent.com
  //363966363314-s33hahdt5jl5qlvao1jvhlqgmb8o7aei.apps.googleusercontent.com