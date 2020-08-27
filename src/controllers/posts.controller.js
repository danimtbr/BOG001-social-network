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

    postForm.addEventListener("submit", async event => {
        event.preventDefault();
        const postText = postForm["textPost"];
        objectPost.postText = postText.value;
        await createPost(objectPost);
        postForm.reset();
        postForm.focus();
    });



    onGetPost((querySnapshot) => {
        const orderPosts = divElement.querySelector("#listPosts");
        const listPostPrint = printPosts(orderPosts, querySnapshot);
        orderPosts.replaceWith(listPostPrint);
    })


    return divElement;
}

const onGetPost = (callback) => database.collection("posts").onSnapshot(callback);
const deletePost = (id) => database.collection("posts").doc(id).delete();
const getPost = (id) => database.collection("posts").doc(id).get();

const printPosts = (listPost, querySnapshot) => {
    listPost.innerHTML = "";
    querySnapshot.forEach(element => {
        const dataElement = element.data();
        dataElement.id = element.id;
        const divCollection = document.createElement("div");
        divCollection.classList = "divPost";
        divCollection.innerHTML = collectionPost;
        let postParagraph = divCollection.querySelector("#textPost");
        postParagraph.innerHTML = dataElement.postText;
        let deleteButtonId = divCollection.querySelector("#deletePostButton");
        deleteButtonId.dataset.id = dataElement.id;
        let editButtonId = divCollection.querySelector("#editPostButton");
        editButtonId.dataset.id = dataElement.id;

        const deleteButtons = divCollection.querySelectorAll(".deletePost");
        deleteButtons.forEach(button => {
            button.addEventListener("click", async(event) => {
                await deletePost(event.target.dataset.id);
            })
        })

        const editButtons = divCollection.querySelectorAll(".editPost");
        editButtons.forEach(button => {
            button.addEventListener("click", async(event) => {
                const postGet = await getPost(event.target.dataset.id);
                console.log(postGet.data());

            })
        })



        listPost.appendChild(divCollection);
    });
    return listPost;
}

const createPost = async(post) => {
    await database.collection("posts").doc().set({
        "userId": post.userId,
        "postDate": post.postDate,
        "postText": post.postText
    })
}

let objectPost = {
    userId: "sofi",
    postDate: Date.now(),
    postText: ""
}