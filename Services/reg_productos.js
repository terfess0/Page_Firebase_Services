import { addProduct, getUserEmail } from "../Services/firebase.js";

const save_product = document.getElementById('btn_reg_product');

async function agg_product() {
    try {
        const email = await getUserEmail();
        
        if (window.correcto === true) {
            const codigo = document.getElementById("Pcodigo").value;
            const nombre = document.getElementById("Pnombre").value;
            const descripcion = document.getElementById("Pdescripcion").value;
            const cantidad = document.getElementById("Pcantidad").value;

            await addProduct(codigo, nombre, descripcion, cantidad, email);
            alert("Producto fue agregado correctamente.");
            window.location.href = "../Templates/home.html";
        }
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

window.addEventListener('DOMContentLoaded', () => {
    save_product.addEventListener('click', agg_product);
});
