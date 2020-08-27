import viewLogin from "../views/login.html";
import logoImg from "../img/logo.png";
import faceImg from "../img/facebook.png";
import googleImg from "../img/google.png";
import arrowBack from "../img/arrow-left.png";
import eyeLogin from "../img/eyeLogin.png";
import { pages } from "./pages.controller.js";



export default () => {

    // Create Dynamic Elements ------------------------------------------>

    const divElement = document.createElement("main");
    divElement.classList = "mainView2";
    divElement.innerHTML = viewLogin;

    divElement.appendChild(pages.popups());

    const imgLogo = divElement.querySelector("#logoView2");
    imgLogo.src = logoImg;

    const imgFace = divElement.querySelector("#faceButton");
    imgFace.src = faceImg;

    const imgGoogle = divElement.querySelector("#googleButton");
    imgGoogle.src = googleImg;

    const imgBackBotton = divElement.querySelector("#back");
    imgBackBotton.src = arrowBack;

    const imgEye = divElement.querySelector("#eyePassword");
    imgEye.src = eyeLogin;

    // Login Event ------------------------------------------------------>

    const loginUser = divElement.querySelector("#formView2");
    loginUser.addEventListener("submit", event => {
        event.preventDefault();
        const email = divElement.querySelector("#username").value;
        const password = divElement.querySelector("#password").value;

        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                window.location.href = "#/posts"
            }).catch(err => {
                let popupElement = divElement.querySelector("#divOverlay");
                popupElement.classList.add("active");

                let popupTittle = divElement.querySelector("#tittlePopup");
                popupTittle.innerHTML = "Error:";

                let popupMessage = divElement.querySelector("#textPopup");
                popupMessage.innerHTML = "Email or password does not exist. Please try again.";
            })
    })

    // Login FaceBook ------------------------------------------------------>
    const loginFacebook = divElement.querySelector("#loginFace");
    loginFacebook.addEventListener("click", event => {
            event.preventDefault();
            const provider = new firebase.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider)
                .then(result => {
                    console.log(result);
                    console.log("signIn facebook");
                })
                .catch(err => {
                    let popupElement = divElement.querySelector("#divOverlay");
                    popupElement.classList.add("active");

                    let popupTittle = divElement.querySelector("#tittlePopup");
                    popupTittle.innerHTML = "Error:";

                    let popupMessage = divElement.querySelector("#textPopup");
                    popupMessage.innerHTML = "Could not authenticate by facebook. Please try again";
                })


        })
        // Login Google -------------------------------------------->
    const loginGoogle = divElement.querySelector("#loginGoogle");
    loginGoogle.addEventListener("click", event => {
        event.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                console.log("Google signIn");
            })
            .catch(err => {
                let popupElement = divElement.querySelector("#divOverlay");
                popupElement.classList.add("active");

                let popupTittle = divElement.querySelector("#tittlePopup");
                popupTittle.innerHTML = "Error:";

                let popupMessage = divElement.querySelector("#textPopup");
                popupMessage.innerHTML = "Could not authenticate by Google. Please try again later";
            })

    })

    const eyesLogin = divElement.querySelector("#eyePassword");
    eyesLogin.addEventListener("click", event => {
        const idPassword = divElement.querySelector("#password");
        if (idPassword.type === "password") {
            idPassword.type = "text"
        } else {
            idPassword.type = "password";
        }
    })
    return divElement;
}