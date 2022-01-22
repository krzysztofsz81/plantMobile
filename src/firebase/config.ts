import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_APP_ID,
} from "@env";
import { onAuthStateChanged, getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

initializeApp({
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  databaseURL: FIREBASE_DATABASE_URL,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  apiKey: FIREBASE_API_KEY,
  appId: FIREBASE_APP_ID,
});

export const auth = getAuth();
