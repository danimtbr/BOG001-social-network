import viewProfileUser from "../views/profileUser.html";
import imgAvatar from "../img/avatar3.png";
import { uploadImgFirebase, updateProfileUser } from "../lib/index.js";
import { showPopup } from "./popups.controller.js";
import { pages } from "./pages.controller.js";

export default () => {

    const divElement = document.createElement("main");
    divElement.id = "profile";
    divElement.classList = "profileUser";
    divElement.innerHTML = viewProfileUser;

    divElement.appendChild(pages.popups());

    const imgAvatarUser = divElement.querySelector("#userAvatarProfile");
    imgAvatarUser.src = localStorage.getItem("urlUserImg");
    let formEdit = divElement.querySelector("#contentInfoProfile");
    updateFormUser(formEdit, localStorage.getItem("username"));

    // Agregar evento en el btnEditProfile para habilitar form ------------------------>
    const eventLoadImg = divElement.querySelector("#inputImgUser");
    const btnEditProfile = divElement.querySelector("#btnEditProfile");
    btnEditProfile.addEventListener("click", async(event) => {
        event.preventDefault();
        let formEdit = divElement.querySelector("#contentInfoProfile");
        if (statusEditProfile === false) {
            formEdit["inputImgUser"].disabled = false;
            formEdit["usernameUpdate"].disabled = false;
            event.target.value = "Update";
            statusEditProfile = true;
        } else {

            // Actualiza perfil usuario -------------------------------------------->
            const updateUsername = divElement.querySelector("#usernameUpdate").value;
            const returnUpdate = await updateProfileUser(localStorage.getItem("urlUserImg"), updateUsername);
            let popupElement = divElement.querySelector("#divOverlay");
            // Actualiza campos del form con informacion actualizada del usuario -------------------------------------------->
            formEdit = updateFormUser(formEdit, returnUpdate.data.displayName);
            if (returnUpdate.status === "") {
                popupElement = showPopup(popupElement, "Successful", "Your profile has been updated");
            } else {
                popupElement = showPopup(popupElement, "Error", "Your profile has not been updated, try again");
            }
            // Vuelve a deshabilitar el formulario
            formEdit["inputImgUser"].disabled = true;
            formEdit["usernameUpdate"].disabled = true;
            event.target.value = "Edit Profile";
            statusEditProfile = false;
        }
    })

    // Agrega evento en el input de cargar imagen
    eventLoadImg.addEventListener("change", event => {
        uploadImgFirebase(event.target);
        imgAvatarUser.src = localStorage.getItem("urlUserImg");
    });

    return divElement;
}




// definicion funcion actualizar campos del form

const updateFormUser = (formEdit, name) => {
    formEdit["usernameUpdate"].value = name;
    localStorage.setItem("username", name);
    return formEdit;
}

// Variable global para manejar status
let statusEditProfile = false;