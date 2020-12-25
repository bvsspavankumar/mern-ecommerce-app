import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrUIRR-yhBUawl1hops3BF-wtlRGnqgck",
    authDomain: "mern-ecommerce-92eac.firebaseapp.com",
    projectId: "mern-ecommerce-92eac",
    storageBucket: "mern-ecommerce-92eac.appspot.com",
    messagingSenderId: "694803962361",
    appId: "1:694803962361:web:d73b1bd196634b693c8528"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth()
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
