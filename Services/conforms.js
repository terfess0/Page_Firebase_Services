import { loginauth } from "../Services/firebase.js"

const caja = document.getElementById('formreg')

async function validar() {

    const email = caja['usuario'].value
    const password = caja['password'].value

    if (email.trim() === '' || password.trim() === '') {
        alert("Debe llenar los campos de usuario y el de contraseña.")
        return
    }

    const verification = await login_auth(email, password)
    const validation = await verificar

    if (verification != null) {
        alert("Usuario autenticado: " + email)
        window.location.href = "Templates/home.html"
    } else {
        console.log("Sesión " + email + " no validada");
        alert("Error de usuario, verifique usuario y/o contraseña.")
    }

}

boton.addEventListener('click', (e) => {
    e.preventDefault()
    validar()
})