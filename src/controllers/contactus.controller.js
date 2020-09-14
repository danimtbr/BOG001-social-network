import viewContactUs from "../views/contactus.html";
import imgStefy from "../img/StephanieJolianis.png";
import imgDani from "../img/danielaM.png";
import iconUbication from "../img/iconUbication.png";

export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainViewContactUs";
    divElement.innerHTML = viewContactUs;

    const stefy = divElement.querySelector("#imgStefy");
    stefy.src = imgStefy;

    const dani = divElement.querySelector("#imgDani");
    dani.src = imgDani;

    const imgUbication = divElement.querySelector("#iconUbication");
    imgUbication.src = iconUbication

    return divElement;
}