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
    FacebookAuthProvider,
    sendPasswordResetEmail,
    deleteUser
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

//firestore
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
const user = auth.currentUser;
export const db = getFirestore(app);

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

//-----------------------------------------------------------------------------------------
//Metodos autenticacion firebase

// Iniciando con Facebook
export const popup_facebook = () =>
    signInWithPopup(auth, providerFacebook)
        .then((result) => {
            const user = result.user;

            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            return accessToken;
        })
        .catch((error) => {
            console.error("Error al iniciar sesión con Facebook:", error);

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

export const getUidUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        return user.uid;
    }
}

//enviar correo verificacion registro
const actionCodeSettings = {
    url: 'https://terfess0.github.io/ApiWebNube/index.html',
    handleCodeInApp: true
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

//recuperar contraseña
export const recovery_pass = (email) =>
    sendPasswordResetEmail(auth, email)

//eliminar usuario (usuario)
export const delete_account = () =>
    deleteUser(getAuth().currentUser)

//recovery usuario en home (logeado)
export const recoveryUserLog = () =>
    sendPasswordResetEmail(auth, getAuth().currentUser.email)

//-----------------------------------------------------------------------------------------
//Metodos database con firestore

export const addProduct = (codigo, nombre, descripcion, cant, email) =>
    addDoc(collection(db, "productos"), {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        cantidad: cant,
        ownerEmail: email
    })

export const addDataUser = (identi, name, birthdate, dir, tel, email) =>
    addDoc(collection(db, "users"), {
        userIdentification: identi,
        userName: name,
        userBirthDate: birthdate,
        userDirection: dir,
        userPhone: tel,
        userEmail: email
    })

export const addCity = (codigo, name, country) =>
    setDoc(doc(db, "cities", codigo), {
        codigo,
        name,
        country
    })


//getters
export const getDataProducts = () =>
    getDocs(collection(db, "productos"))

export const getUserEmail = () => {

    const auth2 = getAuth();
    onAuthStateChanged(auth2, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            return user.uid;
            // ...
        } else {
            // User is signed out
            // ...
            return 'no'
        }
    });
}

export const getDataUsers = () =>
    getDocs(collection(db, "users"))

export const getRegisterWhenDoc = (codigo) =>
    getDoc(doc(db, "cities", codigo));



//eliminar informacion de usuario (admin)
export const getDocUser = (email) => {
    const q = query(collection(db, "users"), where("userEmail", "==", email));

    const querySnapshot = getDocs(q);
    return querySnapshot
}
export const deleteDataUser = (idDoc) =>
    deleteDoc(doc(db, "users", idDoc))


//---------------------------------------
