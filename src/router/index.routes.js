import { pages } from "../controllers/pages.controller.js"

let content = document.getElementById("body");

const router = (route) => {
    content.innerHTML = "";
    switch (route) {
        case "":
        case "#/":
            {
                return content.appendChild(pages.default());
            }
        case "#/login":
            {
                return content.appendChild(pages.login());
            }
    }

}

export { router }