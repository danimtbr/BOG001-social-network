import { pages } from "../controllers/pages.controller.js"


let content = document.getElementById("body");

const router = (route) => {
    content.innerHTML = "";
    const uId = localStorage.getItem("user");
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
        case "#/login":
            {
                return content.appendChild(pages.login());
            }
        case "#/avatar":
            {
                return uId ? content.appendChild(pages.avatar()) : content.appendChild(pages.default());
            }
        case "#/posts":
            {
                return uId ? content.appendChild(pages.posts()) : content.appendChild(pages.default());
            }
        case "#/newPost":
            {
                return uId ? content.appendChild(pages.textAreaPost()) : content.appendChild(pages.default());
            }
        case "#/aboutus":
            {
                return content.appendChild(pages.aboutUs());
            }
        case "#/contactus":
            {
                return content.appendChild(pages.contactUs());
            }
    }
}

export { router }