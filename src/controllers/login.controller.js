import viewLogin from "../views/login.html";
import logoImg from "../img/logo.png";
import faceImg from "../img/facebook.png";
import googleImg from "../img/google.png";

export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainView2";
    divElement.innerHTML = viewLogin;

    const imgLogo = divElement.querySelector("#logoView2");
    imgLogo.src = logoImg;

    const imgFace = divElement.querySelector("#faceButton");
    imgFace.src = faceImg;

    const imgGoogle = divElement.querySelector("#googleButton");
    imgGoogle.src = googleImg;


    return divElement;
}