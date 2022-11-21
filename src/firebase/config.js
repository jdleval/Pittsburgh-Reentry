import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBT8DxmIkNMtCQup1oHmiy852LndRl1ZaE',
  authDomain: 'pittsburgh-reentry.firebaseapp.com',
  projectId: 'pittsburgh-reentry',
  storageBucket: 'pittsburgh-reentry.appspot.com',
  messagingSenderId: '282021442382',
  appId: '1:282021442382:web:fed15f5503573f8669241f',
  measurementId: 'G-N1L0306XVJ',
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// time stamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };
