import { recovery_pass, recoveryUserLog } from "../Services/firebase.js"


const recoverUser = document.getElementById("recovery_btn_user_log")

async function recoveryLoged() {
  console.log("Enviando code log")
  const recover = recoveryUserLog()
  const validation = await recover

    .then((validation) => {
      alert("Correo de recuperación enviado a tu correo")
    })
    .catch((error) => {
      // Manejar errores
      switch (error.code) {
        case "auth/invalid-email":
            alert("El correo electrónico proporcionado no es válido.");
            break;
        case "auth/user-not-found":
            alert("No hay ningún usuario registrado con este correo electrónico.");
            break;
        case "auth/operation-not-allowed":
            alert("El restablecimiento de contraseña no está habilitado en la configuración de Firebase.");
            break;
        case "auth/too-many-requests":
            alert("Demasiadas solicitudes de restablecimiento de contraseña. Por favor, inténtalo de nuevo más tarde.");
            break;
        case "auth/network-request-failed":
            alert("Error de red. Por favor, verifica tu conexión a internet y vuelve a intentarlo.");
            break;
        default:
            console.error("Error al enviar el correo de recuperación:", error);
            alert("Ocurrió un error al enviar el correo de recuperación. Por favor, inténtalo de nuevo más tarde.");
            break;
    }
    });
}

window.addEventListener('DOMContentLoaded', async() => {
  recoverUser.addEventListener('click', recoveryLoged)
})