import { addCity } from "../Services/firebase.js"

const action = document.getElementById('regist_city_btn')

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
        } catch (error){
            console.error('error :: ' + error)
            alert("Registro fallido")
        }

    }

}
window.addEventListener('DOMContentLoaded', async () => {
    action.addEventListener('click', guardar)
})