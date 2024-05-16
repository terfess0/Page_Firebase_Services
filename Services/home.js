import { userState, log_out, getUserEmail } from "../Services/firebase.js";

userState()

const sesion = document.getElementById('btn_log_out')

window.addEventListener('DOMContentLoaded', async () => {
    const emailUser = getUserEmail();
    const correo = document.getElementById("userEmail");

    if (emailUser) {
        correo.innerHTML = emailUser;
    } else {
        correo.innerHTML = "No disponible";
    }

    sesion.addEventListener('click', cerrarSesion);
});

async function cerrarSesion(){
    const verificacion = log_out()
    const comprobar = await verificacion

    .then((comprobar) =>{
        alert("Sesion cerrada")
        window.location.href = '../index.html'
    })
    .catch((error) => {
        alert('Sesion no creada')
    })
}

window.addEventListener('DOMContentLoaded', async() =>{
    sesion.addEventListener('click', cerrarSesion)
})