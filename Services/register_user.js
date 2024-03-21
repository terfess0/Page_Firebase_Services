import { registerauth } from "../Services/firebase.js"

const save_auth = document.getElementById('btn_register')

async function register() {
    const nombreInput = document.getElementById('nombre').value
    const apellidoInput = document.getElementById('apellido').value
    const emailInput = document.getElementById('emailR').value
    const contraseñaInput = document.getElementById('contraseñaR').value

    if (nombreInput.trim() === '' || apellidoInput.trim() === '' || emailInput.trim() === '' || contraseñaInput.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
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
