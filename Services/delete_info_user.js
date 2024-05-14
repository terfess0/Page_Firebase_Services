import { getDocUser, deleteDataUser } from "../Services/firebase.js";

const action = document.getElementById("btn_delete_user_info");

async function delete_data() {
    console.log("Tratando de borrar");
    if (window.delete_verificado === true) {
        console.log("Buscando correo para borrar");
        const emailUser = document.getElementById("emailDU").value;

        try {
            const querySnapshot = await getDocUser(emailUser);

            const data = querySnapshot.forEach(element => {
                console.log("mostrando dato: " + element.id)

                try {
                    const del = deleteDataUser(element.id)
                    alert("Usuario eliminado.")
                    document.getElementById("modalDeleteUser").style.display = "none";

                } catch (error) {
                    console.error("Error al eliminar datos de usuario:", error);
                    alert("Error al eliminar usuario.");
                }


            });

        } catch (error) {
            console.error("Error al obtener el documento:", error);
            alert("Error al obtener el documento.");
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    action.addEventListener("click", delete_data);
});
