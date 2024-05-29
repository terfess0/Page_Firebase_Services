import { getDocUser, deleteDataUser } from "../Services/firebase.js";

const action = document.getElementById("btn_delete_user_info");

async function delete_data() {
    console.log("Tratando de borrar");

    if (window.delete_verificado === true) {
        console.log("Buscando correo para borrar");
        const emailUser = document.getElementById("emailDU").value;

        try {  
            const querySnapshot = await getDocUser(emailUser);

            if (!querySnapshot.empty) {
                for (const doc of querySnapshot.docs) {
                    try {
                        await deleteDataUser(doc.id);
                        alert("Usuario eliminado.");
                        document.getElementById("modalDeleteUser").style.display = "none";
                    } catch (error) {
                        console.error("Error al eliminar datos de usuario:", error);
                        alert("Error al eliminar usuario.");
                    }
                }
            } else {
                alert("No se encontró el usuario, revisa el correo ingresado.");
                document.getElementById("emailDU").focus();
             
            }
        } catch (error) {
            console.error("Error al obtener el documento:", error);
            alert("Error al obtener el documento.");
        }

        // Limpiar campo
        document.getElementById("emailDU").value = "";
        action.innerText = "Borrar";
    }
}


window.addEventListener("DOMContentLoaded", () => {
    action.addEventListener("click", delete_data);
});
