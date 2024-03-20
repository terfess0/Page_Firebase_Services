import { login_auth } from "../Services/firebase.js";

const evento = document.getElementById("login_btn");

async function validar() {
    const email = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (email.trim() === '' || password.trim() === '') {
        alert("Debe llenar los campos de usuario y el de contraseña.");
        return;
    }

    try {
        const verification = await login_auth(email, password);

        if (verification != null) {
            alert("Usuario autenticado: " + email);
            window.location.href = "Templates/home.html";
        } else {
            console.log("Sesión " + email + " no validada");
            alert("Error de usuario, verifique usuario y/o contraseña.");
        }
    } catch (error) {
        console.error("Error al autenticar:", error);
        alert("Error de usuario, verifique usuario y/o contraseña.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    evento.addEventListener('click', validar);
});
