import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA-3rKsgL8GOQyP_lWFepzC43iI0GFiGE0",
    authDomain: "shout-out-labs.firebaseapp.com",
    projectId: "shout-out-labs",
    storageBucket: "shout-out-labs.appspot.com",
    messagingSenderId: "1000164775029",
    appId: "1:1000164775029:web:6ff7dd7a13e499395d943c",
    measurementId: "G-59Q550N82T"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export const authProvider = new firebase.auth.GoogleAuthProvider();

  export function signInWithGoogle(): void {
      firebase.auth().signInWithPopup(authProvider);
  }

  export function signOut(): void {
      firebase.auth().signOut();
  }

  export default firebase;
