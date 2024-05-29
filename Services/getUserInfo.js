import { getDocUser, getUserEmail } from "../Services/firebase.js";


// Función principal para obtener y mostrar los datos del usuario
async function dataUserFields() {
    try {
        const emailUser = await getUserEmail();
        console.log("Email??: " + emailUser);

        const docref = await getDocUser(emailUser);
        const querySnapshot = docref;

        querySnapshot.forEach(element => {
            const datos = element.data();

            const userIdentificacion = datos.userIdentification;
            const userName = datos.nameName;
            const userDireccion = datos.userDirection;
            const userTelefono = datos.userPhone;
            const userBirthday = datos.userBirthDate;
            const userEmail = datos.userEmail;

            document.getElementById("userIdentificacion").innerText = userIdentificacion;
            document.getElementById("userName").innerText = userName;
            document.getElementById("userDireccion").innerText = userDireccion;
            document.getElementById("userTelefono").innerText = userTelefono;
            document.getElementById("userBirthday").innerText = userBirthday;
            document.getElementById("userEmail").innerText = userEmail;

        });
    }catch (error) {
        console.error("Error obteniendo el documento:", error);
    }
}

// Evento para ejecutar la función cuando el DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", async () => {
    await dataUserFields();
});
