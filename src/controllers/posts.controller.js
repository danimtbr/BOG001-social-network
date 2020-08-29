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

const onGetPost = (callback) => database.collection("posts").orderBy("postDate", "desc").onSnapshot(callback);
const deletePost = (id) => database.collection("posts").doc(id).delete();
const getPost = (id) => database.collection("posts").doc(id).get();
const updatePost = (id, updateTextPost) => database.collection("posts").doc(id).update(updateTextPost);
const updateLikes = (id, counter) => database.collection("posts").doc(id).update({ likesPost: counter });
const updateUserLike = (id, userLikeId) => database.collection("posts").doc(id).update({ usersLike: firebase.firestore.FieldValue.arrayUnion(userLikeId) });
const updateRemoveLike = (id, userLikeId) => database.collection("posts").doc(id).update({ usersLike: firebase.firestore.FieldValue.arrayRemove(userLikeId) });

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
        textLikes.innerHTML = dataElement.usersLike.length + "Likes";
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
        likebtn.addEventListener("click", async(event) => {
            const idPost = event.target.parentNode.id;
            const postGet = await getPost(idPost);
            console.log(postGet)
            if (postGet.data().usersLike.indexOf(localStorage.getItem("user")) === -1) {
                updateUserLike(idPost, localStorage.getItem("user"));
            } else {
                updateRemoveLike(idPost, localStorage.getItem("user"));
            }
        })


        listPost.appendChild(divCollection);
    });
    return listPost;
}

const createPost = async(post) => {
    await database.collection("posts").doc().set({
        "userId": post.userId,
        "postDate": firebase.firestore.FieldValue.serverTimestamp(),
        "postText": post.postText,
        "likesPost": post.likesPost,
        "usersLike": post.usersLike
    })
}

let objectPost = {
    userId: localStorage.getItem("user"),
    postDate: "",
    postText: "",
    likesPost: "0",
    usersLike: new Array()
}