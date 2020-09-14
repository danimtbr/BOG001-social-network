import viewProfileUser from "../views/profileUser.html";
import imgAvatar from "../img/avatar3.png";
import { uploadImgFirebase, updateProfileUser } from "../lib/index.js";

export default () => {

    const divElement = document.createElement("main");
    divElement.id = "profile";
    divElement.classList = "profileUser";
    divElement.innerHTML = viewProfileUser;

    const imgAvatarUser = divElement.querySelector("#userAvatarProfile");
    imgAvatarUser.src = localStorage.getItem("urlUserImg");

    const eventLoadImg = divElement.querySelector("#inputImgUser");
    const btnSubmit = divElement.querySelector("#btnEditProfile");
    btnSubmit.addEventListener("submit", event => {
        const updateUsername = divElement.querySelector("#usernameUpdate").value;
        updateProfileUser(localStorage.getItem("urlUserImg"), updateUsername)
    })


    // uploadImgFirebase(eventLoadImg);

    eventLoadImg.addEventListener("change", event => {
        console.log(event.target.files[0].name);
        uploadImgFirebase(event.target);
        imgAvatarUser.src = localStorage.getItem("urlUserImg");
    });

    return divElement;
}