import viewHome from "../views/home.html";
import imgLogo from '../img/logo.png';

export default () => {
    const divElement = document.createElement("div");
    divElement.classList = "divContainer";
    divElement.innerHTML = viewHome;

    const divImgLogo = divElement.querySelector("#imgLogo1");
    divImgLogo.src = imgLogo;


    return divElement;
}