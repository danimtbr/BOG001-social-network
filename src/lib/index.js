// aqui exportaras las funciones que necesites
import { auth, database, storage, timeStamp, arrayUnionFunction, arrayRemoveFunction } from "../init-firebase.js";

export const myFunction = () => {
    // aqui tu codigo
    console.log('Hola mundo!');
};

export const createPost = async(post) => {
    await database.collection("posts").doc().set({
        "userId": localStorage.getItem("user"),
        "userName": localStorage.getItem("username"),
        "userImgUrl": localStorage.getItem("urlUserImg"),
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



export const updateProfileUser = async(urlImgUser, usernameNew) => {
    const userCredentials = auth.currentUser;
    let objectReturn = {
        data: userCredentials,
        status: ""
    };
    try {
        await userCredentials.updateProfile({
            photoURL: urlImgUser,
            displayName: usernameNew
        });
        objectReturn.data = userCredentials;
        return objectReturn;
    } catch (error) {
        objectReturn.status = error.message;
    }
}

export const uploadImgFirebase = (eventLoadImg) => {
    let uploadImage = eventLoadImg.files[0];
    uploadImg("userImg/", uploadImage);
}

const uploadImg = (userImg, imgUpload) => {
    const storageUpload = storage.child(userImg + imgUpload.name).put(imgUpload);

    storageUpload.on('state_changed', function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    }, function(error) {
        alert("uploadImage error, try again")
    }, function() {
        storageUpload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            updateProfileUser(downloadURL);
            localStorage.setItem("urlUserImg", downloadURL);
        });
    });

}



const deletePost = (id) => database.collection("posts").doc(id).delete();