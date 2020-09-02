import viewPopUpDelete from "../views/alertdelete.html";

export default () => {
    const divElement = document.createElement("div");
    divElement.classList = "divViewPopUpDelete";
    divElement.id = "deleteIdPopup";
    divElement.innerHTML = viewPopUpDelete;
    const btnCancel = divElement.querySelector("#btnCancel");
    btnCancel.addEventListener("click", (event) => {
        event.preventDefault();
        divElement.classList.remove("active");
    })

    return divElement;
}