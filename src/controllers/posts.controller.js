import viewPosts from "../views/posts.html";
import collectionPost from "../views/postcollection.html";

export default () => {

    const divElement = document.createElement("main");
    divElement.id = "containerPost";
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
            "userId": post.userId,
            "postDate": post.postDate,
            "postText": post.postText
        })
    }

    let objectPost = {
        UserId: "sofi",
        PostDate: Date.now(),
        PostText: ""
    }

    postForm.addEventListener("submit", async event => {
        event.preventDefault();

        const postText = postForm["textPost"];
        objectPost.postText = postText.value;
        await createPost(objectPost);
        postForm.reset();
        postForm.focus();

    });
    const getPost = async() => await database.collection("posts").get();
    window.addEventListener("DOMContentLoaded", async event => {
        event.preventDefault();
        const querySnapshot = await getPost();
        querySnapshot.forEach(element => {
            console.log(element.data());
            const dataElement = element.data();
            const divCollection = document.createElement("div");
            divCollection.classList = "divPost";
            divCollection.innerHTML = collectionPost;
            let postCollection = divCollection.querySelector("#textPost");
            postCollection.innerHTML = dataElement.postText;
            divElement.appendChild(divCollection);
            console.log(divElement)
        });
    });
    return divElement;
}