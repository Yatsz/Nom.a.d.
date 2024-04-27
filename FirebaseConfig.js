import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
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

export const auth = getAuth(app)