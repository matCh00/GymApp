/**
 * Inicjalizacja Firebase
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDg9IvOr-i7mPhvmJ8vXN464kdLCKFUHNk",
  authDomain: "gymapp-53c41.firebaseapp.com",
  projectId: "gymapp-53c41",
  storageBucket: "gymapp-53c41.appspot.com",
  messagingSenderId: "167705880324",
  appId: "1:167705880324:web:94e77aed090fe9865c9251",
  measurementId: "G-1NSWKHKE7Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);