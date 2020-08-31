import viewDefault from "../views/default.html";
import imgLogo from "../img/logo.png";
import imgBooksView1 from "../img/imgBooks.png";
import imgCommunityView1 from "../img/community.png";
import imgShopView1 from "../img/shop.png";
import imgLogoViewDesktop from "../img/logoDesktop.png";


export default () => {
    const divElement = document.createElement("main");
    divElement.classList = "mainView1";
    divElement.innerHTML = viewDefault;


    const divImgUser = divElement.querySelector("#logo");
    divImgUser.src = imgLogo;

    const imgBook1 = divElement.querySelector("#imgBooks");
    imgBook1.src = imgBooksView1;

    const imgCommunity1 = divElement.querySelector("#imgCommunity");
    imgCommunity1.src = imgCommunityView1;

    const imgShop1 = divElement.querySelector("#imgShop");
    imgShop1.src = imgShopView1;

    const imgLogoDesktop = divElement.querySelector("#imgLogoDesktop");
    imgLogoDesktop.src = imgLogoViewDesktop;

    return divElement;
}