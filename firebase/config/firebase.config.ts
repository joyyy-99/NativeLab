// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDFPReU8sO0Ta5I4AerloGvKPDj2kkWow",
  authDomain: "nativelab-a21e6.firebaseapp.com",
  projectId: "nativelab-a21e6",
  storageBucket: "nativelab-a21e6.firebasestorage.app",
  messagingSenderId: "623953854133",
  appId: "1:623953854133:web:1de9918491396b26e208fc",
  measurementId: "G-L8RQF21Y0N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });