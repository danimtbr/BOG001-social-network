import viewPosts from "../views/posts.html";
import collectionPost from "../views/postcollection.html";

export default () => {

    const divElement = document.createElement("main");
    divElement.id = "containerPost";
    divElement.classList = "mainViewPosts";
    divElement.innerHTML = viewPosts;


    //CREAR DIV PRINCIPAL ---------------------------------------------------->

    const logout = divElement.querySelector("#btnLogout");
    logout.addEventListener("click", (event) => {
        event.preventDefault();
        auth.signOut().then(() => {
            window.location.href = "#/";
        })
    })

    // FUNCIONALIDAD DEL BTN LOGOUT ------------------------------------------>

    const postForm = divElement.querySelector("#formPost");

    const createPost = async(post) => {
        await database.collection("posts").doc().set({
            "userId": post.userId,
            "postDate": post.postDate,
            "postText": post.postText
        })
    }

    // CREACION POST --------------------------------------------------------->

    let objectPost = {
        userId: "sofi",
        postDate: Date.now(),
        postText: ""
    }

    // OBJETO CON LA INFO QUE SE GRABA EN DATABASE --------------------------->

    postForm.addEventListener("submit", async event => {
        event.preventDefault();
        const postText = postForm["textPost"];
        objectPost.postText = postText.value;
        await createPost(objectPost);
        postForm.reset();
        postForm.focus();
        // await printPosts();
    });

    // EVENTO SUBMIT --------------------------------------------------------->


    // const printPosts = async() => {
    //     const querySnapshot = await getPost();
    //     const orderPosts = divElement.querySelector("#listPosts");
    //     orderPosts.innerHTML = "";
    //     querySnapshot.forEach(element => {
    //         console.log(element.data());
    //         const dataElement = element.data();
    //         const divCollection = document.createElement("div");
    //         divCollection.classList = "divPost";
    //         divCollection.innerHTML = collectionPost;
    //         let postCollection = divCollection.querySelector("#textPost");
    //         postCollection.innerHTML = dataElement.postText;
    //         orderPosts.appendChild(divCollection);
    //     });
    // }

    // PINTAR POST ---------------------------------------------------------->

    const onGetPost = (callback) => database.collection("posts").onSnapshot(callback);

    window.addEventListener("DOMContentLoaded", () => {
        console.log("Evento posts");
        onGetPost((querySnapshot) => {
            const orderPosts = divElement.querySelector("#listPosts");
            orderPosts.innerHTML = "";
            querySnapshot.forEach(element => {
                console.log(element.data());
                const dataElement = element.data();
                const divCollection = document.createElement("div");
                divCollection.classList = "divPost";
                divCollection.innerHTML = collectionPost;
                let postCollection = divCollection.querySelector("#textPost");
                postCollection.innerHTML = dataElement.postText;
                orderPosts.appendChild(divCollection);
            })
        })
    });

    // CARGAR POST EN EL EVENTO LOAD DE LA VENTANA -------------------------->

    return divElement;
}