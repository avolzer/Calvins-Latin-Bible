// Firebase Config
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyD2to3QVXR6RRTPTYgnk1miQxzBnsHtVCw",
    authDomain: "latin-app-data.firebaseapp.com",
    projectId: "latin-app-data",
    storageBucket: "latin-app-data.appspot.com",
    messagingSenderId: "923079945735",
    appId: "1:923079945735:web:430c970ef13b36a5b0c4a2",
    measurementId: "G-Y97RMF9D40"
  };
  // Exports
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.database();
