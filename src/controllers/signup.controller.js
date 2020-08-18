import viewSignUp from "../views/signup.html";
import logoView3 from "../img/logo.png";
import faceImg from "../img/facebook.png";
import googleImg from "../img/google.png";
// import arrowBack from "../img/arrow-left.png"

export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainView3";
    divElement.innerHTML = viewSignUp;

    const imgLogoView3 = divElement.querySelector("#logoView3");
    imgLogoView3.src = logoView3;

    const imgFace = divElement.querySelector("#faceButton");
    imgFace.src = faceImg;

    const imgGoogle = divElement.querySelector("#googleButton");
    imgGoogle.src = googleImg;

    // const imgBackBotton = divElement.querySelector("#back");
    // imgBackBotton.src = arrowBack;


    return divElement;
}