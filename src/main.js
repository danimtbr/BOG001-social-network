// Este es el punto de entrada de tu aplicacion
import { myFunction } from './lib/index.js';
import "./main.css";
import { router } from "./router/index.routes.js";
import { auth } from "./init-firebase.js";

router(window.location.hash);
window.addEventListener("hashchange", () => {
    router(window.location.hash);
})
auth.onAuthStateChanged((user) => {
    if (user) {
        localStorage.setItem("user", user.uid);
        localStorage.setItem("username", user.displayName);
    } else {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        window.location.href = "#/";
    }
});

myFunction();