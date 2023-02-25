import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJ428xQh5J9MKLHWtZdnkSDgxpfmY8iLA",
    authDomain: "chatgpt-clone-5602d.firebaseapp.com",
    projectId: "chatgpt-clone-5602d",
    storageBucket: "chatgpt-clone-5602d.appspot.com",
    messagingSenderId: "376536098768",
    appId: "1:376536098768:web:780bb5e80e8bcc3cb87bd5"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db } 