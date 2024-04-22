import { popup } from "../Services/firebase.js";

const btnloggoogle = document.getElementById("btn_log_google");

async function log_google() {
    try {
        const verification = await popup();

    } catch (error) {
        console.error("Error al autenticar:", error);
        alert("Error de usuario, verifique usuario y/o contraseña.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    btnloggoogle.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevenir que el botón envíe el formulario
        await log_google();
    });
});
