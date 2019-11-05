import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
  apiKey: "AIzaSyCvWakdZl4njWDJh800dueY0HByBZZK4VU",
  authDomain: "sk-todo-hw3-9c0a8.firebaseapp.com",
  databaseURL: "https://sk-todo-hw3-9c0a8.firebaseio.com",
  projectId: "sk-todo-hw3-9c0a8",
  storageBucket: "sk-todo-hw3-9c0a8.appspot.com",
  messagingSenderId: "520108023986",
  appId: "1:520108023986:web:64702db3b67851f5fe69ab",
  measurementId: "G-WX1ZS80TGK"
};


firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;