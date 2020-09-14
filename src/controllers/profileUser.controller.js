import viewProfileUser from "../views/profileUser.html";
import imgAvatar from "../img/avatar3.png";

export default () => {

    const divElement = document.createElement("main");
    divElement.id = "profile";
    divElement.classList = "profileUser";
    divElement.innerHTML = viewProfileUser;

    const imgAvatarUser = divElement.querySelector("#userAvatarProfile");
    imgAvatarUser.src = imgAvatar;



    return divElement;
}