import viewCreateAcc from "../views/createAccount.html";

export default () => {
    const divElement = document.createElement("div");
    divElement.classList = "divContainer";
    divElement.innerHTML = viewCreateAcc;

    return divElement;
}