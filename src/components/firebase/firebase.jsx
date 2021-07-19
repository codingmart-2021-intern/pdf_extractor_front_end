import firebase from "firebase/app";
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_7HZJDdQ9oxwm7hnmrINcPMcn8Tn-nkI",
    authDomain: "pdf-extractor-fabd3.firebaseapp.com",
    projectId: "pdf-extractor-fabd3",
    storageBucket: "pdf-extractor-fabd3.appspot.com",
    messagingSenderId: "733731014023",
    appId: "1:733731014023:web:9e70e7d08ae104a4793f22",
    measurementId: "G-4MGSCY54YM"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };