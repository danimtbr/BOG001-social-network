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
const updatePost = (id, updateTextPost) => database.collection("posts").doc(id).update(updateTextPost);
const updateLikes = (id, counter) => database.collection("posts").doc(id).update({ likesPost: counter })

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
        let divPost = divCollection.querySelector("#divPostId");
        divPost.id = dataElement.id;
        let textLikes = divCollection.querySelector("#counterLikes");
        textLikes.innerHTML = dataElement.likesPost + "Likes";
        console.log(dataElement);
        const deleteButtons = divCollection.querySelectorAll(".deletePost");
        deleteButtons.forEach(button => {
            button.addEventListener("click", async(event) => {
                await deletePost(event.target.parentNode.id);
            })
        })

        const editButtons = divCollection.querySelectorAll(".editPost");
        editButtons.forEach(button => {
            button.addEventListener("click", async(event) => {
                const idEvent = event.target.parentNode.id;
                const postGet = await getPost(idEvent);
                let divPost = divCollection.querySelector("#" + idEvent);
                const btnEdit = divPost.querySelector("#editPostButton");
                const postEditing = divPost.querySelector("#textPost");
                const postEdit = divPost.querySelector("#editPost");
                if (btnEdit.innerHTML === "Edit") {
                    postEditing.style.display = "none";
                    postEdit.value = postGet.data().postText;
                    postEdit.style.display = "block";
                    btnEdit.innerHTML = "Update";
                } else {
                    await updatePost(idEvent, {
                        "userId": objectPost.userId,
                        "postDate": objectPost.postDate,
                        "postText": postEdit.value
                    });
                    postEdit.style.display = "none";
                    const postEditing = divPost.querySelector("#textPost");
                    postEditing.style.display = "block";
                    btnEdit.innerHTML = "Edit";
                }
            })
        })


        const likebtn = divCollection.querySelector("#like");
        likebtn.addEventListener("click", (event) => {
            const idPost = event.target.parentNode.id;
            updateLikes(idPost, increment);
            const userId = localStorage.getItem(user);
        })

        listPost.appendChild(divCollection);
    });
    return listPost;
}

const createPost = async(post) => {
    await database.collection("posts").doc().set({
        "userId": post.userId,
        "postDate": post.postDate,
        "postText": post.postText,
        "likesPost": post.likesPost
    })
}

let objectPost = {
    userId: "sofi",
    postDate: Date.now(),
    postText: "",
    likesPost: "0"
}