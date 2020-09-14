import viewAboutUs from "../views/aboutus.html";
import imgViewAboutUs from "../img/aboutUsImg.png";

export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainViewAboutUs";
    divElement.innerHTML = viewAboutUs;

    const imgViewAbout = divElement.querySelector("#imgAboutUs");
    imgViewAbout.src = imgViewAboutUs;

    return divElement;
}