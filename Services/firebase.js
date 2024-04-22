import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

//auth
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendSignInLinkToEmail,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();


// Iniciando con Facebook
export const popup_facebook = () =>
    signInWithPopup(auth, providerFacebook)
        .then((result) => {
            // El usuario ha iniciado sesión exitosamente
            const user = result.user;

            // Esto te da un token de acceso de Facebook. Puedes usarlo para acceder a la API de Facebook.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // Retorna el token de acceso
            return accessToken;
        })
        .catch((error) => {
            // Manejar errores
            console.error("Error al iniciar sesión con Facebook:", error);

            // Puedes manejar errores específicos aquí para proporcionar mensajes de error más útiles al usuario
            let errorMessage;
            switch (error.code) {
                case "auth/account-exists-with-different-credential":
                    alert("Ya existe una cuenta asociada con este correo electrónico. Por favor, inicia sesión con otro método.");
                    break;
                default:
                    errorMessage = "Error al iniciar sesión con Facebook. Por favor, inténtalo de nuevo más tarde.";
                    break;
            }

            throw new Error(errorMessage);
        });


//iniciando y registrandose con google
export const popup = () => {
    return signInWithPopup(auth, providerGoogle)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            return user; // Devolver el usuario después de iniciar sesión
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            throw error; // Re-lanzar el error para manejarlo en el código que llama a esta función
        });
};
//enviar correo verificacion registro
const actionCodeSettings = {
    url: 'https://terfess0.github.io/ApiWebNube/Templates/home.html',
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
}


export const enviarCorreoVerifi = (email) =>
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            alert("Correo de verificación enviado correctamente.")
        })
        .catch((error) => {
            const errorCode = error.code
            console.log(errorCode)
            const errorMessage = error.message
            alert("Error al enviar el correo de verificación: " + errorMessage)
        })


//---------------------------------

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

