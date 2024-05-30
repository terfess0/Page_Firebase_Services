import { getDocUser, updateUserInfo, getDataUsers, deleteDataUser } from "../Services/firebase.js";


const errorCampo = document.getElementById('errorMsj');
const emailUser = document.getElementById('edtEmail')


// Función principal para obtener y mostrar los datos del usuario
async function dataUserFields(option) {


    emailUser.addEventListener('input', function () {
        errorCampo.innerText = ''
    })


    if (option === "uno") {
        if (emailUser.value === '') {
            errorCampo.innerText = 'Ingresa un correo para obtener información de usuario'
            emailUser.focus()
            return
        }
    }

    try {
        let docref;

        console.log("Email??: " + emailUser.value);

        if (option === "uno") {
            docref = await getDocUser(emailUser.value);
        } else if (option === "todos") {
            docref = await getDataUsers();
        }
        const querySnapshot = docref;

        //limpiar campo error
        errorCampo.innerText = '';

        const consulta = document.getElementById('usuarioData')

        consulta.innerHTML = ``

        if (querySnapshot.empty) {
            errorCampo.innerText = 'No hay datos asociados a *' + emailUser.value + '*';
            emailUser.value = '';
            return
        }
        // Crear la cabecera de la tabla
        const cabecera = document.createElement('thead')

        cabecera.innerHTML = `
                <tr>
                    <th>Identificacion</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Direccion</th>
                    <th>Cumpleaños</th>
                    <th>Email</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
            `
        consulta.appendChild(cabecera)



        // Agregar filas de datos correspondientes
        querySnapshot.forEach((doc) => {

            const row = document.createElement('tr');
            row.setAttribute('id', doc.id);

            row.innerHTML = `
                <td><span class="editable" data-field="userIdentification">${doc.data().userIdentification}</span></td>
                <td><span class="editable" data-field="userName">${doc.data().userName}</span></td>
                <td><span class="editable" data-field="userPhone">${doc.data().userPhone}</span></td>
                <td><span class="editable" data-field="userDirection">${doc.data().userDirection}</span></td>
                <td><span class="editable" data-field="userBirthDate">${doc.data().userBirthDate}</span></td>
                <td><span class="editable" data-field="userEmail">${doc.data().userEmail}</span></td>
                <td><button class="boton1 btn btn-danger">Borrar</button></td>
                <td><button class="boton2 btn btn-primary">Editar</button></td>
            `;

            row.querySelector('.boton1').addEventListener('click', () => delete_data(doc.id));
            row.querySelector('.boton2').addEventListener('click', () => update(doc.id, row));

            consulta.appendChild(row);
        });
    } catch (error) {
        console.error("Error obteniendo el documento:", error);
    }
}


function update(id, row) {
    const columns = row.getElementsByTagName('td');

    // Convertir los campos de texto en campos de entrada editables
    for (let i = 0; i < columns.length - 2; i++) { // Excluye los dos últimos botones de acción
        const span = columns[i].querySelector('span.editable');
        const value = span.innerText;
        const field = span.dataset.field;
        columns[i].innerHTML = `<input type="text" value="${value}" data-field="${field}">`;
    }

    // Cambiar el botón "Editar" por el botón "Guardar"
    const editButton = row.querySelector('.boton2');
    editButton.innerText = 'Guardar';
    editButton.removeEventListener('click', () => update(id, row)); // Eliminar el evento anterior
    editButton.addEventListener('click', () => save(id, row)); // Agregar el evento para guardar los cambios
}

async function save(id, row) {
    const columns = row.getElementsByTagName('td');
    const newData = {};

    // Recoger los nuevos datos de los campos de entrada
    for (let i = 0; i < columns.length - 2; i++) {
        const input = columns[i].querySelector('input');
        const field = input.dataset.field;
        newData[field] = input.value;
    }

    // Actualizar los datos en Firestore
    try {
        await updateUserInfo(id, newData);
        alert("Datos actualizados correctamente");
        emailUser.value = ''

    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Hubo un error al actualizar los datos");
    }

    // Recargar la tabla
    dataUserFields('todos');
}


// Evento para ejecutar la función cuando el DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", async () => {
    const action1 = document.getElementById('btn_getUser')
    const action2 = document.getElementById('btn_getAllUser')

    action1.addEventListener('click', () => {
        dataUserFields('uno');
    });

    action2.addEventListener('click', () => {
        dataUserFields('todos')
    })
})


async function delete_data(docUserId) {
    console.log("Tratando de borrar");

    try {
        const action = deleteDataUser(docUserId)
        const borrar = await action
        alert("Usuario eliminado.");

        // Recargar la tabla
        dataUserFields('todos');


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
