import { delete_account } from "../Services/firebase.js"

const btnConfirmDeleteAccount = document.getElementById("btn_confirm_delete_account")

async function deleteAccount() {
    const funcion = delete_account()
    console.log("borrando..")
    const borrar = await funcion
        .then((borrar) => {
            alert("Tu cuenta se eliminó correctamente. ¡Adiós!")

            window.location.href = "../index.html"
        })
        .catch((error) => {

            switch (error.code) {
                case "auth/requires-recent-login":
                    
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
