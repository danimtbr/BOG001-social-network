import viewLogin from "../views/login.html";


export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainView2";
    divElement.innerHTML = viewLogin;
}