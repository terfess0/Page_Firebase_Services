import { getDocUser, updateUserInfo, getDataUsers } from "../Services/firebase.js";


const errorCampo = document.getElementById('errorMsj');

var idDocumentoUser = ''

// Función principal para obtener y mostrar los datos del usuario
async function dataUserFields(option) {
    const emailUser = document.getElementById('edtEmail')

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



        //agregar filas de donaciones correspondientes
        querySnapshot.forEach((doc) => {

            idDocumentoUser = doc.id
            const row = document.createElement('tr')

            row.innerHTML = `
                    <td><strong>${doc.data().userIdentification}</strong></td>
                    <td>${doc.data().userName}</td>
                    <td>${doc.data().userPhone}</td>
                    <td>${doc.data().userDirection}</td>
                    <td>${doc.data().userBirthDate}</td>
                    <td>${doc.data().userEmail}</td>
                    <td><button class="btn btn-danger">Borrar</button></td>
                    <td><button class="btn btn-danger">Editar</button></td>
                `

            // Añadir evento de clic para el botón de borrar
            row.querySelector('button').addEventListener('click', () => delete_data(doc.id));

            consulta.appendChild(row)
        })
    } catch (error) {
        console.error("Error obteniendo el documento:", error);
    }


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


async function updateUser(nameField, value) {

    try {
        updateUserInfo(idDocumentoUser, nameField, value)
        alert("Actualizado correctamente")
    } catch (error) {
        console.log("Algo salio mal al editar " + error)

    }

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

// Seleccionar todos los botones por su clase
const botones = document.querySelectorAll('.btn');

// Iterar sobre cada botón y asignar un evento clic
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        // Obtener el ID del botón y llamar a la función correspondiente
        const id = boton.id;
        var btn = boton;
        switch (id) {
            case 'userIdentificacionSave':
                let idValor1 = 'userIdentification';
                let campo1 = document.getElementById(idValor1);
                let nuevoValor1 = campo1.value;
                updateUser(idValor1, nuevoValor1);

                // Ocultar el botón "Guardar"
                boton.style.display = 'none';
                break;
        }
    })
})