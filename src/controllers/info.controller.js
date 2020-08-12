import viewI from "../views/info.html"
import img from '../img/1.png';

export default () => {
    const divElement = document.createElement("div");
    divElement.classList = "divContainer";
    divElement.innerHTML = viewI;

    const divImg = divElement.querySelector("#imgBanner1");
    divImg.src = img;

    return divElement;
}