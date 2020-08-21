import viewPopups from "../views/popups.html";

export default () => {
    let divElement = document.createElement("div");
    divElement.id = "divOverlay";
    divElement.classList = "overlay";
    divElement.innerHTML = viewPopups;

    const buttonClose = divElement.querySelector("#closePopup");
    buttonClose.addEventListener("click", (event) => {
        event.preventDefault();
        divElement.classList.remove("active");
    })

    return divElement;
}