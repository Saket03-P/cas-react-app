// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnWPU5Wt5VTcfLK1qYE6fuULJV7wzTCCI",
  authDomain: "city-administrative-system.firebaseapp.com",
  projectId: "city-administrative-system",
  storageBucket: "city-administrative-system.appspot.com",
  messagingSenderId: "1044469966302",
  appId: "1:1044469966302:web:d72e4d1d187f7cc06d694f",
  measurementId: "G-E8B1YLZXV1"
};

// export default firebaseConfig;
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Initialize Firebase Authentication and get a reference to the service
export const auth= getAuth(app);