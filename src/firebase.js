import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBaiteZltjb5655T_z9L4GQo_QoWJstVqo",
  authDomain: "travel-board-9209b.firebaseapp.com",
  databaseURL: "https://travel-board-9209b.firebaseio.com",
  projectId: "travel-board-9209b",
  storageBucket: "travel-board-9209b.appspot.com",
  messagingSenderId: "398163510800",
  appId: "1:398163510800:web:5f422fad2b841a35ff6c95",
  measurementId: "G-5P08FXB23N"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
