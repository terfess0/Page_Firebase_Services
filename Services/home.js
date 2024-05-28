import { userState, log_out, getUidUser } from "../Services/firebase.js";

if (window.is_admin !== true) {
    userState()
}

const sesion = document.getElementById('btn_log_out')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const emailUser = await getUidUser();
        const correo = document.getElementById("userEmail");

        if (emailUser !== 'no') {
            correo.innerHTML = emailUser;
        } else {
            correo.innerHTML = "No disponible";
        }

        const id = await getUidUser(); // Asegúrate de tener una función similar para obtener el UID
        console.log("El id de usuario es: " + id);

        sesion.addEventListener('click', cerrarSesion);
    } catch (error) {
        console.error("Error obteniendo el email del usuario: ", error);
    }
});

async function cerrarSesion() {
    const verificacion = log_out()
    const comprobar = await verificacion

        .then((comprobar) => {
            alert("Sesion cerrada")
            window.location.href = '../index.html'
        })
        .catch((error) => {
            alert('Sesion no creada')
        })
}

window.addEventListener('DOMContentLoaded', async () => {
    sesion.addEventListener('click', cerrarSesion)
})