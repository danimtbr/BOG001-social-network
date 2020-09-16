// aqui exportaras las funciones que necesites
import { auth, database, storage, timeStamp, arrayUnionFunction, arrayRemoveFunction } from "../init-firebase.js";

export const myFunction = () => {
    // aqui tu codigo
    console.log('Hola mundo!');
};

// Guarda una coleccion de post en firebase---------------------->

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

// Si la coleccion de posts cambia, la actualiza---------------------->

export const onGetPost = (callback) => database.collection("posts").orderBy("postDate", "desc").onSnapshot(callback);

// Trae la coleccion de post en firebase---------------------->

export const getPost = (id) => database.collection("posts").doc(id).get();

// Actualiza post en firebase---------------------->

export const updatePost = (id, updateTextPost) => database.collection("posts").doc(id).update(updateTextPost);

// Agrega un usuarioId al array de users likes asociado al post---------------------->

export const updateUserLike = (id, userLikeId) => database.collection("posts").doc(id).update({ usersLike: arrayUnionFunction(userLikeId) });

// Elimina un usuarioId al array de users likes asociado al post---------------------->

export const updateRemoveLike = (id, userLikeId) => database.collection("posts").doc(id).update({ usersLike: arrayRemoveFunction(userLikeId) });


// Elimina un post---------------------->

export const postDelete = async(id) => {
    await deletePost(id);
}

// eliminar un post---------------------->
const deletePost = (id) => database.collection("posts").doc(id).delete();

// Actualiza los datos del usuario---------------------->

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

// Toma la imagen que el usuario cargo---------------------->

export const uploadImgFirebase = (eventLoadImg) => {
    let uploadImage = eventLoadImg.files[0];
    uploadImg("userImg/", uploadImage);
}

// Sube la imagen a firebase---------------------->

const uploadImg = (userImg, imgUpload) => {
    const storageUpload = storage.child(userImg + imgUpload.name).put(imgUpload);

    storageUpload.on('state_changed', function(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    }, function(error) {
        alert("uploadImage error, try again")
    }, function() {
        storageUpload.snapshot.ref.getDownloadURL()
            .then(function(downloadURL) {
                console.log('File available at', downloadURL);
                // Actualiza la imagen del usuario---------------------->
                updateProfileUser(downloadURL);
                localStorage.setItem("urlUserImg", downloadURL);
            });
    });

}