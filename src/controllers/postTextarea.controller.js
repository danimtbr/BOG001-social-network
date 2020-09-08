import viewTextareaPost from "../views/postTextarea.html";
import { createPost } from "../lib/index.js";

export default () => {

    const divElement = document.createElement("div");
    divElement.id = "newPost";
    divElement.classList = "textAreaPosts";
    divElement.innerHTML = viewTextareaPost;



    const postForm = divElement.querySelector("#formPost");

    postForm.addEventListener("submit", async event => {
        event.preventDefault();
        const postText = postForm["textPost"];
        if (postText.value === "") {
            alert("Your post is empty");
        } else {
            await createPost(postText.value);
            window.location.href = "#/posts"
        }
    });

    return divElement

}