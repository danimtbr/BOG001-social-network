import viewDefault from "../views/default.html";
import imgLogo from "../img/logo.png";
// import imgFireUp from "../img/fireUp1.png";
// import imgFireDown from "../img/fireDown1.png";


export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainView1";
    divElement.innerHTML = viewDefault;


    const divImgUser = divElement.querySelector("#logo");
    divImgUser.src = imgLogo;

    // const divImgFireUp = divElement.querySelector("#fireUp1");
    // divImgFireUp.src = imgFireUp;

    // const divImgFireDown = divElement.querySelector("#fireDown1");
    // divImgFireDown.src = imgFireDown;


    return divElement;
}