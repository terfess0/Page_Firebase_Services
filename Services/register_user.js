import { registerauth, enviarCorreoVerifi, addDataUser } from "../Services/firebase.js"

const save_auth = document.getElementById('btn_register')

async function register() {
    if (window.verificado === true) {
        const emailInput = document.getElementById('emailR').value
        const contraseñaInput = document.getElementById('contraseñaR').value

        //datos user to firebase
        const ident = document.getElementById("identR").value
        const name = document.getElementById("nameR").value
        const dir = document.getElementById("direccionR").value
        const tel = document.getElementById("telR").value
        const rh = document.getElementById("rhR").value
        const est = document.getElementById("estadoR").value
        const gen = document.getElementById("generoR").value

        try {
            await enviarCorreoVerifi(emailInput)
            const verificar = await registerauth(emailInput, contraseñaInput)
            alert("El usuario se registró exitosamente.")
            await addDataUser(ident, name, dir, tel, rh, est, gen, emailInput)
            alert("Los datos de usuario se guardaron.")
        
            window.location.href = "../Templates/verify_mail.html"
            
        } catch (error) {
            document.getElementById("btn_register").innerText = "Registrate";
            if (error.code === 'auth/email-already-in-use') {
                alert("Este correo electrónico ya está en uso. Por favor, utiliza otro.")
            } else if (error.code === 'auth/invalid-email') {
                alert("Correo inválido, sigue el formato: ejemplo@example.com")
            } else {
                alert("Hubo un error, intenta de nuevo más tarde.")
                console.error(error)
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    save_auth.addEventListener('click', register);
});
