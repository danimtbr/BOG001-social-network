import viewAboutUs from "../views/aboutus.html";

export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainViewAboutUs";
    divElement.innerHTML = viewAboutUs;

    return divElement;
}