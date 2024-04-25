import { addRegister } from "../Services/firebase.js"

const save_product = document.getElementById('btn_reg_product')

async function agg_product() {
    if (window.correcto === true) {
        var codigo = document.getElementById("Pcodigo").value
        var nombre = document.getElementById("Pnombre").value
        var descripcion = document.getElementById("Pdescripcion").value
        var cantidad = document.getElementById("Pcantidad").value

        try {
            await addRegister(codigo, nombre, descripcion, cantidad)
            alert("Producto fue agregado correctamente.")
            window.location.href = "../index.html"

        } catch (error) {
            if (error.code === 'permission-denied') {
                alert("No tienes permiso para realizar esta acción.");
            } else if (error.code === 'unavailable') {
                alert("La base de datos no está disponible en este momento. Por favor, inténtalo de nuevo más tarde.");
            } else {
                alert("Hubo un error al agregar el producto. Por favor, inténtalo de nuevo más tarde.");
                console.error(error);
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    save_product.addEventListener('click', agg_product);
});
