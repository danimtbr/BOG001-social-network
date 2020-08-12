import { pages } from "../controllers/pages.controller.js"

let content = document.getElementById("root");

const router = (route) => {
    content.innerHTML = "";
    switch (route) {
        case "#/":
            {
                return content.appendChild(pages.info());
            }
        case "#/account":
            {
                return content.appendChild(pages.account());
            }
        case "#/createAccount":
            {
                return content.appendChild(pages.createAccount());
            }
        case "#/avatar":
            {
                return content.appendChild(pages.avatar());
            }
        case "#/home":
            {
                return content.appendChild(pages.home());
            }
        default:
            return console.log("404");
    }

}

export { router }