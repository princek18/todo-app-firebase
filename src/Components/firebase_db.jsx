import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC4buBaaFKHBxt5fnAK6Pw1bTq_PnwIaLU",
    authDomain: "todo-app-re-32753.firebaseapp.com",
    projectId: "todo-app-re-32753",
    storageBucket: "todo-app-re-32753.appspot.com",
    messagingSenderId: "357326838673",
    appId: "1:357326838673:web:9abdb73c12d0ba0e241830",
    measurementId: "G-86C0PKP3B7"
});

export const db = firebaseApp.firestore();
