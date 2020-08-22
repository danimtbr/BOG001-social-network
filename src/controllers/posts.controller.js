import viewPosts from "../views/posts.html";

export default () => {

    const divElement = document.createElement("main");
    divElement.classList = "mainViewPosts";
    divElement.innerHTML = viewPosts;

    const logout = divElement.querySelector("#btnLogout");
    logout.addEventListener("click", (event) => {
        event.preventDefault();
        auth.signOut().then(() => {
            window.location.href = "#/";
        })
    })


    const postForm = divElement.querySelector("#formPost");

    const createPost = async(post) => {
        await database.collection("posts").doc().set({
            post
        })
    }

    postForm.addEventListener("submit", async event => {
        event.preventDefault();

        const postText = postForm["textPost"].value;

        await createPost(postText);

    })

    return divElement;
}