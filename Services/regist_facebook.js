import { popup_facebook } from "../Services/firebase.js" 

const btnregistfacebook = document.getElementById("btn_regist_facebook") 

async function regist_facebook() {
    try {
        const verification = await popup_facebook() 
        if (verification != null) {
            alert("Usuario autenticado: " + verification.email) 
            window.location.href = "../Templates/home.html" 
        } else {
            console.log("Sesión no validada") 
            alert("Error de usuario, verifique usuario y/o contraseña.") 
        }
    } catch (error) {
        console.error("Error al autenticar:", error) 
        if (error.code === "auth/popup-closed-by-user") {
            // El usuario cerró la ventana de inicio de sesión
            alert("Iniciar sesión con Facebook cancelado.") 
        } else if (error.code === "auth/account-exists-with-different-credential") {
            // El ya esta registrado con otro metodo
            alert("Usuario ya esta registrado con otro metodo (Correo o Google), Por favor inicie sesión.") 
            window.location.href = "../index.html" 
        } else {
            alert("Error de autenticación. Prueba mas tarde.")
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    btnregistfacebook.addEventListener('click', async (e) => {
        console.log("registro facebook") 
        e.preventDefault() 
        await regist_facebook() 
    }) 
}) 
