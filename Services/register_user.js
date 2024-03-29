import { registerauth } from "../Services/firebase.js"

const save_auth = document.getElementById('btn_register')

async function register() {
    if (window.verificado === true) {
        const emailInput = document.getElementById('emailR').value
        const contraseñaInput = document.getElementById('contraseñaR').value

        const validar = registerauth(emailInput, contraseñaInput)
        const verificar = await validar

            .then((verificar) => {
                alert("El usuario se registro exitosamente..")
                const user = verificar.user;
                window.location.href = "../index.html"
            })

            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert("Este correo electrónico ya está en uso. Por favor, utiliza otro.")
                } else if(error.code === 'auth/invalid-email') {
                    alert("Correo invalido, sigue el formato: ejemplo@example.com")
                }else{
                    alert("Hubo un error, intenta de nuevo más tarde.")
                    console.error(error)
                }
            })
    }
}


window.addEventListener('DOMContentLoaded', () => {
    save_auth.addEventListener('click', register);
});
