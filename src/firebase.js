// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBMznDQJOXR1j5-oKw1F2shwXCD-bGgoT8",
  authDomain: "instagram-clone-react-5cda5.firebaseapp.com",
  projectId: "instagram-clone-react-5cda5",
  storageBucket: "instagram-clone-react-5cda5.appspot.com",
  messagingSenderId: "963435027159",
  appId: "1:963435027159:web:0c762ab74090afef21ae92",
  measurementId: "G-GGC900PC6M"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};