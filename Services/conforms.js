import{loginauth} from "../Services/firebase.js"

const caja = document.getElementById('formreg')

caja.addEventListener('submit', (e) =>{

    const email = caja['usuario'].value
    const password = caja['password'].value

    if (email.trim() === '' || password.trim() === '') {
        alert("Debe llenar los campos de usuario y el de contraseña.")
        return
    }

    try {
        const verification = await login_auth(email, password)

        if (verification != null) {
            alert("Usuario autenticado: " + email)
            window.location.href = "Templates/home.html"
        } else {
            console.log("Sesión " + email + " no validada");
            alert("Error de usuario, verifique usuario y/o contraseña.")
        }
    } catch (error) {
        console.error("Error al autenticar:", error)
        alert("Error de usuario, verifique usuario y/o contraseña.")
    }
    
})