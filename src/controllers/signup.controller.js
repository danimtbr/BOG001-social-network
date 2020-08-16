import viewSignUp from "../views/signup.html";

export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainView3";
    divElement.innerHTML = viewSignUp;

    return divElement;
}