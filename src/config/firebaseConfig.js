import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBFtGhdpvnnUTmcx8xNv5n8reL6sp0U48Y",
    authDomain: "sk-todo-hw3.firebaseapp.com",
    databaseURL: "https://sk-todo-hw3.firebaseio.com",
    projectId: "sk-todo-hw3",
    storageBucket: "sk-todo-hw3.appspot.com",
    messagingSenderId: "990680882115",
    appId: "1:990680882115:web:1980f048833d03103dfb76",
    measurementId: "G-5X87VZ7Y72"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;