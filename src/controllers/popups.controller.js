import viewPopups from "../views/popups.html";
import errorImg from "../img/oops.png";


export default () => {
    let divElement = document.createElement("div");
    divElement.id = "divOverlay";
    divElement.classList = "overlay";
    divElement.innerHTML = viewPopups;

    const imgError = divElement.querySelector("#errorImg");
    imgError.src = errorImg;

    const buttonClose = divElement.querySelector("#closePopup");
    buttonClose.addEventListener("click", (event) => {
        event.preventDefault();
        divElement.classList.remove("active");
    })

    return divElement;
}

// Funcion mostrar popUp -------------------------------------------->
export const showPopup = (element, tittle, message) => {
    element.classList.add("active");

    let popupTittle = element.querySelector("#tittlePopup");
    popupTittle.innerHTML = tittle;

    let popupMessage = element.querySelector("#textPopup");
    popupMessage.innerHTML = message;

    return element;
}