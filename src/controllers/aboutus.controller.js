import viewAboutUs from "../views/aboutus.html";
import aboutUsImg from "../img/informationAbout.png";
import rectangleImg from "../img/rectangle.png"


export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainViewAboutUs";
    divElement.innerHTML = viewAboutUs;

    const imgAboutUs = divElement.querySelector("#imgAboutUs");
    imgAboutUs.src = aboutUsImg;

    const imgRectangle = divElement.querySelector("#rectangleAbout");
    imgRectangle.src = rectangleImg;

    return divElement;
}