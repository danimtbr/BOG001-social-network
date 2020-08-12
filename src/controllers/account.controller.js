import viewAcc from "../views/account.html";
import img from '../img/google.png';
import img1 from '../img/facebook.png';

export default () => {
    const divElement = document.createElement("div");
    divElement.classList = "divContainer";
    divElement.innerHTML = viewAcc;

    const divImg = divElement.querySelector("#imgGoogle");
    divImg.src = img;

    const divImg1 = divElement.querySelector("#imgFacebook");
    divImg1.src = img1;

    return divElement;
}