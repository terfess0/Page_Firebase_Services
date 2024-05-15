import { getDataUsers} from "../Services/firebase.js"

const contain = document.getElementById("usersData")

async function view_users(){

    contain.innerHTML = "";
    const users = getDataUsers();
  
    const query = await users;
  
    query.forEach((doc) => {
  
        contain.innerHTML += `
          <tr>
          <th scope = "row">${doc.data().userIdentification}</th>
          <td>${doc.data().userName}</td>
          <td>${doc.data().userEmail}</td>
          <td>${doc.data().userBirthDate}</td>
          </tr>
          `;
    });

}

window.addEventListener("DOMContentLoaded", async => {
    view_users()
})