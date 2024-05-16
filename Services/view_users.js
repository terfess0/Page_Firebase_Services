import { getDataUsers, getDocUser, deleteDataUser } from "../Services/firebase.js";

const contain = document.getElementById("usersData");

async function view_users() {
    contain.innerHTML = "";
    const users = getDataUsers();
    const query = await users;

    query.forEach((doc) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <th scope="row">${doc.data().userIdentification}</th>
            <td>${doc.data().userName}</td>
            <td>${doc.data().userEmail}</td>
            <td>${doc.data().userBirthDate}</td>
            <td><button class="btn btn-danger">Borrar</button></td>
        `;

        // Añadir evento de clic para el botón de borrar
        row.querySelector('button').addEventListener('click', () => delete_data(doc.id));

        contain.appendChild(row);
    });
}


async function delete_data(docUserId) {
    console.log("Tratando de borrar");

    try {
        const action = deleteDataUser(docUserId)
        const borrar = await action
        alert("Usuario eliminado.");
        //recargar la página
        location.reload();


    } catch (error) {
        console.error("Error al eliminar datos de usuario:", error.code);

        switch (error.code) {
            case 'permission-denied':
                alert("Permisos insuficientes para eliminar el usuario.");
                break;
            case 'not-found':
                alert("Usuario no encontrado.");
                break;
            default:
                alert("Error al eliminar usuario: " + error.message);
                break;
        }
    }
}


window.addEventListener("DOMContentLoaded", () => {
    view_users();
});
