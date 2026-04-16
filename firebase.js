// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//IDK if we need the getStorage yet, but if we want to add in custom profile photos later on (maybe for the profile page Brock) this is useful

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSeHliy2fPz0e33ZGU-JinVnmwXCIaIpY",
  authDomain: "dustbuddies-1945b.firebaseapp.com",
  projectId: "dustbuddies-1945b",
  storageBucket: "dustbuddies-1945b.firebasestorage.app",
  messagingSenderId: "379836656035",
  appId: "1:379836656035:web:27b5babceed663cbe8d216"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);