// aqui exportaras las funciones que necesites
import { database, timeStamp, arrayUnionFunction, arrayRemoveFunction } from "../init-firebase.js";

export const myFunction = () => {
    // aqui tu codigo
    console.log('Hola mundo!');
};

export const createPost = async(post) => {
    await database.collection("posts").doc().set({
        "userId": localStorage.getItem("user"),
        "userName": localStorage.getItem("username"),
        "postDate": timeStamp,
        "postText": post,
        "usersLike": new Array()
    })
}

export const onGetPost = (callback) => database.collection("posts").orderBy("postDate", "desc").onSnapshot(callback);

export const getPost = (id) => database.collection("posts").doc(id).get();
export const updatePost = (id, updateTextPost) => database.collection("posts").doc(id).update(updateTextPost);
export const updateUserLike = (id, userLikeId) => database.collection("posts").doc(id).update({ usersLike: arrayUnionFunction(userLikeId) });
export const updateRemoveLike = (id, userLikeId) => database.collection("posts").doc(id).update({ usersLike: arrayRemoveFunction(userLikeId) });

export const popUpDelete = async(id) => {
    await deletePost(id);
}


const deletePost = (id) => database.collection("posts").doc(id).delete();