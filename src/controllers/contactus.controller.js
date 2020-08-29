import viewContactUs from "../views/contactus.html";

export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainViewContactUs";
    divElement.innerHTML = viewContactUs;

    return divElement;
}