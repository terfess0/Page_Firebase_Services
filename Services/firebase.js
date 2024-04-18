// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

//auth
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendSignInLinkToEmail
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChViHU9-o0bPiKxVrakSgrrGUBrcBs39M",
    authDomain: "apiweb-a6b44.firebaseapp.com",
    projectId: "apiweb-a6b44",
    storageBucket: "apiweb-a6b44.appspot.com",
    messagingSenderId: "922422199542",
    appId: "1:922422199542:web:5af8c0fac93108818398d7",
    measurementId: "G-DW5CM9575Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };

export const enviarCorreoVerifi = (email, actionCodeSettings) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
}
//metodo de autenticacion de usuario
export const login_auth = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

//cerrar sesion del usuario
export const log_out = () =>
    signOut(auth)


export const userState = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            window.location.href = "../index.html"
        }
    });
}

//registro
export const registerauth = (email, password) =>
createUserWithEmailAndPassword(auth, email, password)

