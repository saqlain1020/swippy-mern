import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyALWpDuD3hQfrEIk381uJOTvIPoDaJaqfg",
  authDomain: "swippy-1020.firebaseapp.com",
  projectId: "swippy-1020",
  storageBucket: "swippy-1020.appspot.com",
  messagingSenderId: "467255184438",
  appId: "1:467255184438:web:3c872836adc8fe37e69c97",
};

firebase.initializeApp(firebaseConfig);

export var storage = firebase.storage().ref();
export var auth = firebase.auth();
export var firestore = firebase.firestore();
export var serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export var functions = firebase.functions();

//Enable these lines to use with emulator

// functions.useEmulator("localhost", 5001);
// firestore.useEmulator("localhost", 8080);
// auth.useEmulator('http://localhost:9099/');

export default firebase;
