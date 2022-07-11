import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};
  
export const firebaseApp = initializeApp(firebaseConfig); // initialize app
export const db = getFirestore(); // this gets the firestore database

//### REGISTER USER WITH FIREBASE AUTHENTICATION ###//
export const registerUser = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

//### LOGIN USER WITH FIREBASE ###//
export const loginUser = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

//### RESET PASSWORD ###//
export const resetPassword = (email) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

//### SIGN OUT ###//
export const logoutUser = () => {
  const auth = getAuth();
  signOut(auth);
};

//### CONVERT FROM DATE TO TIMESTAMP TO FIRESTORE ###//
export const convertToTimestamp = (date) => {
  return Timestamp.fromDate(date);
};

//### CONVERT FROM TIMESTAMP TO DATE FROM FIRESTORE ###//
export const convertDate = (date) => {
  return date.toDate().toLocaleString('en-UK', {dateStyle: 'short'});
};