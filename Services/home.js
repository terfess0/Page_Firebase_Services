import { userState, log_out } from "../Services/firebase.js";

userState()

const sesion = document.getElementById('btn_log_out')

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