import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9QS8m1gxmCD1AaTGnKyzzoCoPgJTlBv0",
    authDomain: "signal-rn-38612.firebaseapp.com",
    projectId: "signal-rn-38612",
    storageBucket: "signal-rn-38612.appspot.com",
    messagingSenderId: "735698708269",
    appId: "1:735698708269:web:a18db9083a455beabd95a4"
  };

let app;

if(firebase.apps.length) {
    app = firebase.app();
}else {
    app = firebase.initializeApp(firebaseConfig);
}

const db = app.firestore();
const auth =  firebase.auth();

export { db, auth }