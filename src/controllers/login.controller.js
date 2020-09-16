import viewLogin from "../views/login.html";
import logoImg from "../img/logo.png";
import faceImg from "../img/facebook.png";
import googleImg from "../img/google.png";
import eyeLogin from "../img/eyeLogin.png";
import hideLogin from "../img/hideLogin.png"
import { pages } from "./pages.controller.js";
import { auth, firebase } from "../init-firebase.js";



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

    const imgEye = divElement.querySelector("#eyePassword");
    imgEye.src = hideLogin;


    // Agregar evento al boton submit para ejecutar funcion signInWithEmailAndPassword ------->

    const loginUser = divElement.querySelector("#formView2");
    loginUser.addEventListener("submit", event => {
        event.preventDefault();
        const email = divElement.querySelector("#username").value;
        const password = divElement.querySelector("#password").value;

        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                console.log(userCredentials);
                window.location.href = "#/posts"
            }).catch(err => {
                let popupElement = divElement.querySelector("#divOverlay");
                popupElement.classList.add("active");

                let popupTittle = divElement.querySelector("#tittlePopup");
                popupTittle.innerHTML = "Error:";

                let popupMessage = divElement.querySelector("#textPopup");
                popupMessage.innerHTML = err.message;
            })
    })

    // Login FaceBook ------------------------------------------------------>
    const loginFacebook = divElement.querySelector("#faceButton");
    loginFacebook.addEventListener("click", event => {
            event.preventDefault();
            const provider = new firebase.auth.FacebookAuthProvider();
            console.log(provider);
            auth.signInWithPopup(provider)
                .then(result => {
                    window.location.href = "#/posts"
                    console.log(result);
                    console.log("signIn facebook");
                })
                .catch(err => {
                    console.log(err);
                    let popupElement = divElement.querySelector("#divOverlay");
                    popupElement.classList.add("active");

                    let popupTittle = divElement.querySelector("#tittlePopup");
                    popupTittle.innerHTML = "Error:";

                    let popupMessage = divElement.querySelector("#textPopup");
                    popupMessage.innerHTML = err.message;
                })


        })
        // Login Google -------------------------------------------->
    const loginGoogle = divElement.querySelector("#googleButton");
    loginGoogle.addEventListener("click", event => {
        event.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                window.location.href = "#/posts"
                console.log(result);
                console.log("Google signIn");
            })
            .catch(err => {
                console.log(err);
                let popupElement = divElement.querySelector("#divOverlay");
                popupElement.classList.add("active");

                let popupTittle = divElement.querySelector("#tittlePopup");
                popupTittle.innerHTML = "Error:";

                let popupMessage = divElement.querySelector("#textPopup");
                popupMessage.innerHTML = err.message;
            })

    })

    // Ocultar y mostrar password -------------------------------------------->
    const eyesLogin = divElement.querySelector("#eyePassword");
    eyesLogin.addEventListener("click", event => {
        const idPassword = divElement.querySelector("#password");
        if (idPassword.type === "password") {
            idPassword.type = "text"
            imgEye.src = eyeLogin;

        } else {
            imgEye.src = hideLogin;
            idPassword.type = "password"
        }
    })
    return divElement;
}