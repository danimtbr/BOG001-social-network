import viewPosts from "../views/posts.html";
import collectionPost from "../views/postcollection.html";
import { auth, database, timeStamp, arrayUnionFunction, arrayRemoveFunction } from "../init-firebase.js";
import heartlike from "../img/heartlike.png";
import heart from "../img/heart.png";

export default () => {

    const divElement = document.createElement("main");
    divElement.id = "containerPost";
    divElement.classList = "mainViewPosts";
    divElement.innerHTML = viewPosts;

    const username = divElement.querySelector("#userSessionName");
    console.log(username);
    username.textContent = localStorage.getItem("username").toString();

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
        await createPost(postText.value);
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
const updateUserLike = (id, userLikeId) => database.collection("posts").doc(id).update({ usersLike: arrayUnionFunction(userLikeId) });
const updateRemoveLike = (id, userLikeId) => database.collection("posts").doc(id).update({ usersLike: arrayRemoveFunction(userLikeId) });

const printPosts = (listPost, querySnapshot) => {
    listPost.innerHTML = "";
    querySnapshot.forEach(element => {
        const dataElement = element.data();
        dataElement.id = element.id;
        const userSessionNow = localStorage.getItem("user");
        const divCollection = document.createElement("div");
        divCollection.classList = "divPost";
        divCollection.innerHTML = collectionPost;
        let postUserName = divCollection.querySelector("#username");
        postUserName.textContent = dataElement.userName;
        let postParagraph = divCollection.querySelector("#textPost");
        postParagraph.innerHTML = dataElement.postText;
        let divPost = divCollection.querySelector("#divPostId");
        divPost.id = dataElement.id;
        let textLikes = divCollection.querySelector("#counterLikes");
        textLikes.innerHTML = dataElement.usersLike.length + "Likes";
        const deleteButtons = divCollection.querySelectorAll(".deletePost");
        const deleteButtonId = divCollection.querySelector("#deletePostButton")
        const likebtn = divCollection.querySelector("#like");
        if (dataElement.usersLike.indexOf(userSessionNow) === -1) {
            likebtn.src = heart;
        } else {
            likebtn.src = heartlike;
        }
        if (dataElement.userId === userSessionNow) {
            deleteButtonId.style.display = "block";
            deleteButtons.forEach(button => {
                button.addEventListener("click", async(event) => {
                    await deletePost(event.target.parentNode.id);
                })
            })

        }
        deleteButtons.forEach(button => {
            button.addEventListener("click", async(event) => {
                await deletePost(event.target.parentNode.id);
            })
        })

        const editButtonId = divCollection.querySelector("#editPostButton");
        if (dataElement.userId === userSessionNow) {
            editButtonId.style.display = "block";
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
                            "postDate": timeStamp,
                            "postText": postEdit.value
                        });
                        postEdit.style.display = "none";
                        const postEditing = divPost.querySelector("#textPost");
                        postEditing.style.display = "block";
                        btnEdit.innerHTML = "Edit";
                    }
                })
            })
        }




        likebtn.addEventListener("click", async(event) => {
            const idPost = event.target.parentNode.id;
            const postGet = await getPost(idPost);
            console.log(postGet)
            if (postGet.data().usersLike.indexOf(localStorage.getItem("user")) === -1) {
                likebtn.src = heartlike;
                updateUserLike(idPost, localStorage.getItem("user"));
            } else {
                likebtn.src = heart;
                updateRemoveLike(idPost, localStorage.getItem("user"));
            }
        })


        listPost.appendChild(divCollection);
    });
    return listPost;
}

const createPost = async(post) => {
    await database.collection("posts").doc().set({
        "userId": localStorage.getItem("user"),
        "userName": localStorage.getItem("username"),
        "postDate": timeStamp,
        "postText": post,
        "usersLike": new Array()
    })
}