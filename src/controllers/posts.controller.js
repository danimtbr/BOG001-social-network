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

    return divElement;
}