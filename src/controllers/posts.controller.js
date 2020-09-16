import viewPosts from "../views/posts.html";
import collectionPost from "../views/postcollection.html";
import { auth, timeStamp } from "../init-firebase.js";
import heartlike from "../img/heartlike.png";
import heart from "../img/heart.png";
import settings from "../img/settings.png";
import newPost from "../img/btnpost.png";
import avatar from "../img/avatar3.png";
import imgDelete from "../img/trash.png";
import imgEdit from "../img/edit-2.png";
import imgUpdate from "../img/edit-1.png";
import { pages } from "./pages.controller.js";
import { onGetPost, getPost, updatePost, updateUserLike, updateRemoveLike, postDelete } from "../lib/index.js";
import { showAlertDelete } from "./alertdelete.controller.js";

export default () => {

    const divElement = document.createElement("main");
    divElement.id = "containerPost";
    divElement.classList = "mainViewPosts";
    divElement.innerHTML = viewPosts;

    const imgAvatar = divElement.querySelector("#avatarUserViewPost");
    imgAvatar.src = localStorage.getItem("urlUserImg");

    const imgSettings = divElement.querySelector("#settingsViewPosts");
    imgSettings.src = settings;

    const username = divElement.querySelector("#userSessionName");
    username.textContent = localStorage.getItem("username").toString();

    const imgPostNew = divElement.querySelector("#imgNewPost");
    imgPostNew.src = newPost;

    divElement.appendChild(pages.popupdelete());

    // Mostrar y ocultar menu ---------------------->
    const menuSettingsUser = divElement.querySelector("#settingsUser")
    const settingsUser = divElement.querySelector("#settingsViewPosts");
    settingsUser.addEventListener("click", () => {
        console.log(menuSettingsUser.style.display);
        menuSettingsUser.style.display == "none" || "" ? menuSettingsUser.style.display = "flex" : menuSettingsUser.style.display = "none";
    })

    // Agregar evento al boton logout ---------------------->
    const logout = divElement.querySelector("#btnLogout");
    logout.addEventListener("click", (event) => {
        event.preventDefault();
        auth.signOut().then(() => {
            window.location.href = "#/";
        })
    })

    // Funcion pintar actualizar ordenar posts ---------------------->

    onGetPost((querySnapshot) => {
        const orderPosts = divElement.querySelector("#listPosts");
        const listPostPrint = printPosts(orderPosts, querySnapshot);
        let listImgLikes = listPostPrint.querySelectorAll(".btnLikePost");
        listImgLikes = listenerLike(listImgLikes);
        orderPosts.replaceWith(listPostPrint);
        let idPopUp = document.querySelector("#deleteIdPopup");
        idPopUp = listenerDeletePopup(idPopUp);
    })


    return divElement;
}

// Definicion funcion pintar posts ---------------------->

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
        userAvatar.src = dataElement.userImgUrl || avatar;
        let postParagraph = divCollection.querySelector("#textPost");
        postParagraph.innerHTML = dataElement.postText;
        let divPost = divCollection.querySelector("#divPostId");
        divPost.id = dataElement.id;
        let textLikes = divCollection.querySelector("#counterLikes");
        textLikes.innerHTML = dataElement.usersLike.length + "Likes";
        const likebtn = divCollection.querySelector("#like");

        // validacion array users likes ---------------------->

        if (dataElement.usersLike.indexOf(userSessionNow) === -1) {
            likebtn.src = heart;
        } else {
            likebtn.src = heartlike;
        }

        // pintar boton edit y delete si usuario actual id = usuario post id  ---------------------->

        if (dataElement.userId === userSessionNow) {
            // let deleteButtons = divCollection.querySelectorAll(".deletePost");
            const deleteButtonId = divCollection.querySelector("#deletePostButton");
            deleteButtonId.src = imgDelete;
            deleteButtonId.style.display = "block";
            // deleteButtons = listenerLaunchDelete(deleteButtons, idPopUp);
            const btnEdit = divPost.querySelector("#editPostButton");
            btnEdit.src = imgEdit;
            btnEdit.style.display = "block";
            // let editButtons = divCollection.querySelectorAll(".editPost");
            // editButtons = listenerEdit(editButtons, divPost);
            divPost = listenerEdit(divPost);
            divPost = listenerDelete(divPost);
        }
        listPost.appendChild(divCollection);
    });
    return listPost;
}


// Eliminar post en el evento click del boton delete del popup ---------------------->

const listenerDeletePopup = (popupObject) => {
    popupObject.addEventListener("click", async(event) => {
        if (event.target.id === "btnDelete") {
            await postDelete(confirmPostId);
            // Oculta popup de confirmacion para eliminar post 
            showAlertDelete(false);
        }
    })
    return popupObject;
}

// Agrega el evento al boton eliminar para mostrar popup ---------------------->

const listenerDelete = (postContainer) => {
    let button = postContainer.querySelector("#deletePostButton");
    button.addEventListener("click", async() => {
        // Muestra popup de confirmacion para eliminar post 
        showAlertDelete(true);
        confirmPostId = postContainer.id;
    })
    return postContainer;
}

// Agrega el evento al boton editar post para ejecutar la funcion showEditPost------>

const listenerEdit = (postContainer) => {
    let button = postContainer.querySelector("#editPostButton");
    button.addEventListener("click", async() => {
        postContainer = await showEditPost(postContainer);
    })
    return postContainer;
}

// Valida si el usuario esta editando o esta guardando los cambios ---------------------->

const showEditPost = async(postContainer) => {
    const postText = postContainer.querySelector("#textPost");
    const postEdit = postContainer.querySelector("#editPost");
    const buttonEdit = postContainer.querySelector("#editPostButton");
    if (editingPost === false) {
        postEdit.value = postText.innerHTML;
        postText.style.display = "none";
        postEdit.style.display = "block";
        buttonEdit.src = imgUpdate;
        editingPost = true;
    } else {
        await updatePost(postContainer.id, {
            "postDate": timeStamp,
            "postText": postEdit.value
        });
        postEdit.style.display = "none";
        postText.innerHTML = postEdit.innerHTML;
        postText.style.display = "block";
        buttonEdit.src = imgEdit;
        editingPost = false;
    }
    return postContainer;
}


// funcion like unlike ----------------------------->

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


// Variables globales para asignar status---------------------->

let confirmPostId = "";
let editingPost = false;