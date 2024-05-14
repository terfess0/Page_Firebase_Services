import { getDocUser } from "../Services/firebase.js";

const action = document.getElementById("btn_delete_user_info");

async function delete_data() {
    console.log("Tratando de borrar");
    if (window.delete_verificado === true) {
        console.log("Buscando correo para borrar");
        const emailUser = document.getElementById("emailDU").value;


        const querySnapshot = getDocUser(emailUser);


        // Muestra la información
        alert("Este correo coincide: " + querySnapshot[0].data().userEmail);


    }
}

window.addEventListener("DOMContentLoaded", () => {
    action.addEventListener("click", delete_data);
});
