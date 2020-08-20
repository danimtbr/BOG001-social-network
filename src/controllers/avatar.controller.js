import viewAvatarUser from "../views/avatar.html";

export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainViewAvatar";
    divElement.innerHTML = viewAvatarUser;

    return divElement;
}