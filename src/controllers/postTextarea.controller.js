import viewTextareaPost from "../views/postTextarea.html";
import { createPost } from "../lib/index.js";
import avatarUser from "../img/avatar3.png";
import { pages } from "./pages.controller.js";

export default () => {

    const divElement = document.createElement("div");
    divElement.id = "newPost";
    divElement.classList = "textAreaPosts";
    divElement.innerHTML = viewTextareaPost;

    divElement.appendChild(pages.popups());

    const imgUser = divElement.querySelector("#userImgTextarea");
    imgUser.src = localStorage.getItem("urlUserImg");

    divElement.querySelector("#textPost").placeholder = localStorage.getItem("username") + ", what are you thinking " + "?";



    const postForm = divElement.querySelector("#formPost");
    const btnSavePost = divElement.querySelector("#save1");
    btnSavePost.addEventListener("click", async event => {
        event.preventDefault();
        const postText = postForm["textPost"];
        if (postText.value === "") {
            let popupElement = divElement.querySelector("#divOverlay");
            popupElement.classList.add("active");

            let popupTittle = divElement.querySelector("#tittlePopup");
            popupTittle.innerHTML = "Error:";

            let popupMessage = divElement.querySelector("#textPopup");
            popupMessage.innerHTML = "Your post is empty";
        } else {
            await createPost(postText.value);
            window.location.href = "#/posts"
        }
    });

    return divElement

}