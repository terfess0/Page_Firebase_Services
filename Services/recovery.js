import{Resetpassword} from "../Controllers/firebase.js"

const recover = document.getElementById("recoverybtn")

async function Resetear(){
    const email = document.getElementById('edtuser').value

    const verificar=Resetpassword(email)
    const validation = await verificar

    .then((validation) => {
        alert("Reset verification succesfull "+email)
        window.location.href="recovery.html"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
}

window.addEventListener('DOMContentLoaded', async()=>{
    recover.addEventListener('click', Resetear)
})