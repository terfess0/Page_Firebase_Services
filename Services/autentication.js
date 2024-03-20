import {login_auth} from "../Services/firebase.js"

const evento = document.getElementById("login_btn")

async function validar(){

    const email = document.getElementById('usuario').value
    const password = document.getElementById('password').value

    const verificar = login_auth(email, password)
    const validation = await verificar 

    if(verificar != null){
        alert("Usuario autenticado: " + email)
        window.location.href = "../Templates/home.html"
    }else{
        console.log("Sesion "+ email + " not validation")
        alert("Error de usuario verifique usuario y/o contraseña")
    }

}

window.addEventListener('DOMContentLoaded', async() =>{
    evento.addEventListener('click', validar)
})