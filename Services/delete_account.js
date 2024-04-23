import { delete_account } from "../Services/firebase.js"

const btnConfirmDeleteAccount = document.getElementById("btn_confirm_delete_account")

async function deleteAccount() {
    const funcion = delete_account()
    console.log("borrando..")
    const borrar = await funcion
        .then((borrar) => {
            alert("Tu cuenta se eliminó correctamente. ¡Adiós!")
            // Redirigir al usuario a una página de salida o agradecimiento
            window.location.href = "../index.html"
        })
        .catch((error) => {
            // Manejar errores
            switch (error.code) {
                case "auth/requires-recent-login":
                    // Redirigir al usuario a la página de inicio después de volver a autenticarse
                    alert("Debes volver a autenticarte antes de eliminar tu cuenta.")
                    window.location.href = "../index.html"
                    break
                case "auth/user-not-found":
                    alert("No se encontró ningún usuario con este ID.")
                    break
                case "auth/network-request-failed":
                    alert("Error de red. Por favor, verifica tu conexión a internet y vuelve a intentarlo.")
                    break
                default:
                    console.error("Error al eliminar usuario:", error)
                    alert("Ocurrió un error al eliminar tu cuenta. Por favor, inténtalo de nuevo más tarde.")
                    break
            }
        })
}


window.addEventListener('DOMContentLoaded', () => {
    btnConfirmDeleteAccount.addEventListener('click', deleteAccount)
})
