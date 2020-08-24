// Este es el punto de entrada de tu aplicacion
import { myFunction } from './lib/index.js';
import "./main.css";
import { router } from "./router/index.routes.js"

router(window.location.hash);
window.addEventListener("hashchange", () => {
    router(window.location.hash);
    console.log(window.location.hash);
})
auth.onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        localStorage.setItem("user", user.uid);
    } else {
        localStorage.removeItem("user");
        window.location.href = "#/";
    }
});

myFunction();