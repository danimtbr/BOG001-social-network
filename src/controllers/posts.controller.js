import viewPosts from "../views/posts.html";
import collectionPost from "../views/postcollection.html";
import { auth, database, timeStamp, arrayUnionFunction, arrayRemoveFunction } from "../init-firebase.js";
import heartlike from "../img/heartlike.png";
import heart from "../img/heart.png";
import settings from "../img/settings.png";
import newPost from "../img/btnpost.png";
import avatar from "../img/avatar3.png";
import imgDelete from "../img/trash.png";
import imgEdit from "../img/edit-2.png";
import imgUpdate from "../img/edit-1.png";
import { pages } from "./pages.controller.js";
import { onGetPost, getPost, updatePost, updateUserLike, updateRemoveLike, popUpDelete } from "../lib/index.js";

export default () => {

    const divElement = document.createElement("main");
    divElement.id = "containerPost";
    divElement.classList = "mainViewPosts";
    divElement.innerHTML = viewPosts;

    const imgSettings = divElement.querySelector("#settingsViewPosts");
    imgSettings.src = settings;

    const username = divElement.querySelector("#userSessionName");
    username.textContent = localStorage.getItem("username").toString();

    const imgPostNew = divElement.querySelector("#imgNewPost");
    imgPostNew.src = newPost;

    divElement.appendChild(pages.popupdelete());

    const logout = divElement.querySelector("#btnLogout");
    logout.addEventListener("click", (event) => {
        event.preventDefault();
        auth.signOut().then(() => {
            window.location.href = "#/";
        })
    })

    onGetPost((querySnapshot) => {
        const orderPosts = divElement.querySelector("#listPosts");
        const listPostPrint = printPosts(orderPosts, querySnapshot);
        setEvents(listPostPrint);
        orderPosts.replaceWith(listPostPrint);
    })


    return divElement;
}

const printPosts = (listPost, querySnapshot) => {
    listPost.innerHTML = "";
    querySnapshot.forEach(element => {
        const dataElement = element.data();
        dataElement.id = element.id;
        const userSessionNow = localStorage.getItem("user");
        const divCollection = document.createElement("div");
        divCollection.classList = "divPost";
        divCollection.innerHTML = collectionPost;
        let postUserName = divCollection.querySelector("#usernamePost");
        postUserName.textContent = dataElement.userName;
        let userAvatar = divCollection.querySelector("#avatarUser");
        userAvatar.src = avatar;
        let postParagraph = divCollection.querySelector("#textPost");
        postParagraph.innerHTML = dataElement.postText;
        let divPost = divCollection.querySelector("#divPostId");
        divPost.id = dataElement.id;
        let textLikes = divCollection.querySelector("#counterLikes");
        textLikes.innerHTML = dataElement.usersLike.length + "Likes";
        let deleteButtons = divCollection.querySelectorAll(".deletePost");
        const deleteButtonId = divCollection.querySelector("#deletePostButton");
        deleteButtonId.src = imgDelete;
        const likebtn = divCollection.querySelector("#like");

        let idPopUp = document.querySelector("#deleteIdPopup");
        if (dataElement.usersLike.indexOf(userSessionNow) === -1) {
            likebtn.src = heart;
        } else {
            likebtn.src = heartlike;
        }
        const btnEdit = divPost.querySelector("#editPostButton");
        btnEdit.src = imgEdit;

        // ------------------ POPUP DELETE ---------------------->
        if (dataElement.userId === userSessionNow) {
            deleteButtonId.style.display = "block";
            deleteButtons = listenerLaunchDelete(deleteButtons, idPopUp);
            btnEdit.style.display = "block";
            let editButtons = divCollection.querySelectorAll(".editPost");
            editButtons = listenerEdit(editButtons, divPost);
            // deleteButtons.forEach(button => {
            //     button.addEventListener("click", (event) => {
            //         idPopUp.classList.add("active");
            //         confirmPostId = event.target.parentNode.parentNode.parentNode.parentNode.id;
            //     })
            // })
        }

        // ----------- FUNCTION LISTENER DELETE ----------------->
        idPopUp = listenerDelete(idPopUp);




        // if (dataElement.userId === userSessionNow) {
        //     btnEdit.style.display = "block";
        //     let editButtons = divCollection.querySelectorAll(".editPost");
        //     listenerEdit(editButtons);
        // }




        listPost.appendChild(divCollection);
    });
    return listPost;
}

const listenerDelete = (popupObject) => {
    popupObject.addEventListener("click", async(event) => {
        if (event.target.id === "btnDelete") {
            await popUpDelete(confirmPostId);
            popupObject.classList.remove("active");
        }
    })
    return popupObject;
}

const listenerLaunchDelete = (listDeleteImg, popupObject) => {
    listDeleteImg.forEach(button => {
        button.addEventListener("click", (event) => {
            popupObject.classList.add("active");
            confirmPostId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        })
    })
    return listDeleteImg;
}


const listenerEdit = (listEditing, postContainer) => {
    listEditing.forEach(button => {
        button.addEventListener("click", async(event) => {
            const idEvent = event.target.parentNode.parentNode.parentNode.parentNode.id;
            const postGet = await getPost(idEvent);
            //let divPost = listCollection.querySelector("#" + idEvent);
            const postEditing = postContainer.querySelector("#textPost");
            const postEdit = postContainer.querySelector("#editPost");
            if (editingPost === false) {
                postEditing.style.display = "none";
                postEdit.value = postGet.data().postText;
                postEdit.style.display = "block";
                //btnEdit.src = imgUpdate;
                event.target.src = imgUpdate;
                editingPost = true;
            } else {
                await updatePost(idEvent, {
                    "postDate": timeStamp,
                    "postText": postEdit.value
                });
                postEdit.style.display = "none";
                //const postEditing = divPost.querySelector("#textPost");
                postEditing.style.display = "block";
                //btnEdit.src = imgEdit;
                event.target.src = imgEdit;
                editingPost = false;
            }
        })
    })

    return listEditing;
}


const listenerLike = (listLikeImg) => {
    listLikeImg.forEach(button => {
        button.addEventListener("click", async(event) => {
            const idPost = event.target.parentNode.parentNode.parentNode.parentNode.id;
            const postGet = await getPost(idPost);
            if (postGet.data().usersLike.indexOf(localStorage.getItem("user")) === -1) {
                event.target.src = heartlike;
                updateUserLike(idPost, localStorage.getItem("user"));
            } else {
                event.target.src = heart;
                updateRemoveLike(idPost, localStorage.getItem("user"));
            }
        });
    });
    return listLikeImg;
}

const setEvents = (postsList) => {
    let listImgLikes = postsList.querySelectorAll(".btnLikePost");
    listImgLikes = listenerLike(listImgLikes);
}

let confirmPostId = "";
let editingPost = false;

// const createPost = async(post) => {
//     await database.collection("posts").doc().set({
//         "userId": localStorage.getItem("user"),
//         "userName": localStorage.getItem("username"),
//         "postDate": timeStamp,
//         "postText": post,
//         "usersLike": new Array()
//     })
// }