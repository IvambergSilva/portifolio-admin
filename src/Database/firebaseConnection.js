import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA8CtEx_Jay5Wyj0AX8MO2QqQPEQownUHw",
    authDomain: "apiportfolio-10e14.firebaseapp.com",
    projectId: "apiportfolio-10e14",
    storageBucket: "apiportfolio-10e14.appspot.com",
    messagingSenderId: "987218658021",
    appId: "1:987218658021:web:bfd778a146f1263924ca0c",
    measurementId: "G-8LEYWG84R1"
}

const db = getFirestore(initializeApp(firebaseConfig))

const auth = getAuth(initializeApp(firebaseConfig))

export { db, auth }