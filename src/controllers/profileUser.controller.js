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


    const eventLoadImg = divElement.querySelector("#inputImgUser");
    const btnSubmit = divElement.querySelector("#btnEditProfile");
    btnSubmit.addEventListener("click", async(event) => {
        event.preventDefault();
        let formEdit = divElement.querySelector("#contentInfoProfile");
        if (btnEditProfile === false) {
            formEdit["inputImgUser"].disabled = false;
            formEdit["usernameUpdate"].disabled = false;
            event.target.value = "Update";
            btnEditProfile = true;
        } else {
            const updateUsername = divElement.querySelector("#usernameUpdate").value;
            const returnUpdate = await updateProfileUser(localStorage.getItem("urlUserImg"), updateUsername);
            let popupElement = divElement.querySelector("#divOverlay");
            formEdit = updateFormUser(formEdit, returnUpdate.data.displayName);
            if (returnUpdate.status === "") {
                popupElement = showPopup(popupElement, "Successful", "your profile has been updated");
            } else {
                popupElement = showPopup(popupElement, "Error", "your profile has not been updated, try again");
            }
            formEdit["inputImgUser"].disabled = true;
            formEdit["usernameUpdate"].disabled = true;
            event.target.value = "Edit Profile";
            btnEditProfile = false;
        }
    })


    eventLoadImg.addEventListener("change", event => {
        uploadImgFirebase(event.target);
        imgAvatarUser.src = localStorage.getItem("urlUserImg");
    });

    return divElement;
}



let btnEditProfile = false;

const updateFormUser = (formEdit, name) => {
    formEdit["usernameUpdate"].value = name;

    return formEdit;
}