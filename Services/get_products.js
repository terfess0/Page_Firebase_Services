import { getDataProducts } from "../Services/firebase.js";


const ver = document.getElementById("vdata")

async function cargar(){
    ver.innerHTML = ""
    const docref = getDataProducts()
    
    const querySnapshot = await docref

    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
}

window.addEventListener('DOMContentLoaded', async() =>{
    cargar()
})
