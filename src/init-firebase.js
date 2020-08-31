import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCNU_2E0vH-XPBk3tqkrckPG_IowYbxrpU",
    authDomain: "hibook-2fc84.firebaseapp.com",
    databaseURL: "https://hibook-2fc84.firebaseio.com",
    projectId: "hibook-2fc84",
    storageBucket: "hibook-2fc84.appspot.com",
    messagingSenderId: "376783395535",
    appId: "1:376783395535:web:891ae5ecf7f5a8985bf5ba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

const arrayUnionFunction = (userId) => {
    return firebase.firestore.FieldValue.arrayUnion(userId);
}

const arrayRemoveFunction = (userId) => {
    return firebase.firestore.FieldValue.arrayRemove(userId);
}

// const authWithFacebook = () => {
//     const provider = new firebase.auth.FacebookAuthProvider();
//     return provider;
// }



export { auth, database, timeStamp, arrayUnionFunction, arrayRemoveFunction, firebase }