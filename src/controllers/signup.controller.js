import viewSignUp from "../views/signup.html";
import logoView3 from "../img/logo.png";
import faceImg from "../img/facebook.png";
import googleImg from "../img/google.png";
import { pages } from "./pages.controller.js";
import { auth, firebase } from "../init-firebase.js";

export default () => {

    // Create Dynamic Elements ------------------------------------------>

    const divElement = document.createElement("main");
    divElement.classList = "mainView3";
    divElement.innerHTML = viewSignUp;

    divElement.appendChild(pages.popups());

    const imgLogoView3 = divElement.querySelector("#logoView3");
    imgLogoView3.src = logoView3;

    const imgFace = divElement.querySelector("#faceButton");
    imgFace.src = faceImg;

    const imgGoogle = divElement.querySelector("#googleButton");
    imgGoogle.src = googleImg;


    // SignUp Event ------------------------------------------------------>

    const signUpUser = divElement.querySelector("#formView3");
    signUpUser.addEventListener("submit", (e) => {
        e.preventDefault();
        const signUpUserName = divElement.querySelector("#username").value;
        const signUpEmail = divElement.querySelector("#email").value;
        const signUpPassword = divElement.querySelector("#password").value;
        const signUpConfirmPassword = divElement.querySelector("#confirmPass").value;

        const actionCodeSettings = { url: 'https://hibooklab.page.link/QXTh', dynamicLinkDomain: 'hibooklab.page.link' };

        if (signUpPassword === signUpConfirmPassword) {
            auth
                .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
                .then(userCredentials => {
                    userCredentials.user.updateProfile({
                            displayName: signUpUserName
                        }).then(() => {
                            const userVerfication = firebase.auth().currentUser;
                            userVerfication.sendEmailVerification(actionCodeSettings)
                                .then(() => {
                                    alert("Email sent");
                                })
                        })
                        .catch((error) => {
                            alert("Authentication Failed");
                        });
                })




            // const userVerfication = firebase.auth().currentUser;
            // console.log(userVerfication);
            // userVerfication.sendEmailVerification(actionCodeSettings).then(function() {
            //     alert("Email sent");
            // }).catch(function(error) {
            //     alert("Authentication Failed");
            // })

        } else {
            let spanInvalid = divElement.querySelector("#invalidPass");
            spanInvalid.textContent = "Your password and confirmation password do not match, please try again"
        }

    })


    // Login FaceBook ------------------------------------------------------>
    const signUpFacebook = divElement.querySelector("#faceButton");
    signUpFacebook.addEventListener("click", event => {
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
    const signUpGoogle = divElement.querySelector("#googleButton");
    signUpGoogle.addEventListener("click", event => {
        event.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
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
                popupMessage.innerHTML = "Could not authenticate by Google. Please try again";
            })
    })
    return divElement;
}