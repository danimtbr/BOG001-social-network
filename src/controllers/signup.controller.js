import viewSignUp from "../views/signup.html";
import logoView3 from "../img/logo.png";
import faceImg from "../img/facebook.png";
import googleImg from "../img/google.png";

export default () => {

    // Create Dynamic Elements ------------------------------------------>

    const divElement = document.createElement("main");
    divElement.classList = "mainView3";
    divElement.innerHTML = viewSignUp;

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
        console.log(signUpPassword, signUpEmail, signUpUserName, signUpConfirmPassword);

        if (signUpPassword === signUpConfirmPassword) {
            auth
                .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
                .then(userCredentials => {
                    console.log("userRegistred");
                    window.location.href = "#/avatar"
                })
        } else {
            let spanInvalid = divElement.querySelector("#invalidPass");
            spanInvalid.textContent = "Your password and confirmation password do not match, please try again"
        }

    })
    return divElement;
}