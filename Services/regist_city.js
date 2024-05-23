import { addCity, getRegisterWhenDoc } from "../Services/firebase.js"

const action = document.getElementById('regist_city_btn')
const actionSearch = document.getElementById('get_city_btn')

async function guardar() {
    const codigo = document.getElementById('codigo')
    const nombre = document.getElementById('nombre')
    const pais = document.getElementById('pais')

    if (codigo.value === "" && nombre.value === "" && pais.value === "") {
        alert("Debe completar todos los campos")
        codigo.focus()
    } else {

        try {
            await addCity(codigo.value, nombre.value, pais.value)
            alert("Registro exitoso")
            window.location.href = "register_city.html"
            limpiarCampos()
        } catch (error) {
            console.error('error :: ' + error)
            alert("Registro fallido")
        }

    }
}

async function leer() {
    const codigo = document.getElementById('codigo')

    if (codigo.value === "") {
        alert("Debe proporcionar un codigo para la busqueda")
        codigo.focus()
    } else {

        try {
            const data = await getRegisterWhenDoc(codigo.value)
            alert("Correcto: " + data)
            const obj = document.getElementById('busqueda')

            if (data.exists()) {

                obj.innerHTML += `
                    <tr>
                    <th scope = "row">${data.data().codigo})</th>
                    <td>${data.data().nombre}</td>
                    <td>${data.data().pais}</td>
                    </tr>
                    `;
            };
            limpiarCampos()
        } catch (error) {
            console.error('error :: ' + error)
            alert("Registro fallido")
        }

    }

}



window.addEventListener('DOMContentLoaded', async () => {
    action.addEventListener('click', guardar)
    actionSearch.addEventListener('click', leer)
})