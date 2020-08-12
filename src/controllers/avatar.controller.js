import viewAvatar from "../views/avatar.html";
import imgAvatar from '../img/imguser.png';

export default () => {
    const divElement = document.createElement("div");
    divElement.classList = "divContainer";
    divElement.innerHTML = viewAvatar;

    const divImgUser = divElement.querySelector("#imgAvatarUser");
    divImgUser.src = imgAvatar;

    return divElement;
}