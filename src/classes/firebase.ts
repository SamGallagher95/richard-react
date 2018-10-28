// Initialize Firebase

import "firebase/firestore";

import * as firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyA2dlWGxlkaWVVTNKB8G1-iOespvaBDYKU",
  authDomain: "simple-cms-c3cde.firebaseapp.com",
  databaseURL: "https://simple-cms-c3cde.firebaseio.com",
  messagingSenderId: "430231022870",
  projectId: "simple-cms-c3cde",
  storageBucket: "simple-cms-c3cde.appspot.com"
};
firebase.initializeApp(config);

export default firebase;
