import viewPopUpDelete from "../views/alertdelete.html";
import alertImg from "../img/alert.png";

export default () => {
    const divElement = document.createElement("div");
    divElement.classList = "divViewPopUpDelete";
    divElement.id = "deleteIdPopup";
    divElement.innerHTML = viewPopUpDelete;

    const imgAlert = divElement.querySelector("#imgAlert");
    imgAlert.src = alertImg;

    const btnCancel = divElement.querySelector("#btnCancel");
    btnCancel.addEventListener("click", (event) => {
        event.preventDefault();
        divElement.classList.remove("active");
    })

    return divElement;
}