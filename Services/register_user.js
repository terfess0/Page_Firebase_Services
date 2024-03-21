import { registerauth } from "../Services/firebase.js"

const save_auth = document.getElementById('btn_register')

async function register() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const contraseñaInput = document.getElementById('contraseña');

    const validar = registerauth(emailInput, contraseñaInput)
    const verificar = await validar

    .then((verificar) => {
        alert("El usuario se registro exitosamente..")
        const user = verificar.user;
        window.location.href = "../index.html"

    })

    .catch((error) => {
        alert("Hubo un error, intenta mas tarde")
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

window.addEventListener('DOMContentLoaded', () => {
    save_auth.addEventListener('click', register);
});
