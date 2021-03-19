import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  let firebaseConfig = {
    apiKey: "AIzaSyBFwN4hi_Ebnn0tA9d_jxY9CN8haIohS2Q",
    authDomain: "react-app-01-5734d.firebaseapp.com",
    projectId: "react-app-01-5734d",
    storageBucket: "react-app-01-5734d.appspot.com",
    messagingSenderId: "540035791916",
    appId: "1:540035791916:web:00d259f7a906344a866589",
    measurementId: "G-793TY6WSRW"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  
    firebase.analytics();

  const auth = fire.auth();
  const store = fire.firestore();

  export { auth, store };