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
        case "#/signup":
            {
                return content.appendChild(pages.signup());
            }
    }

}

export { router }