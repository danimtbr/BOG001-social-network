import Default from "./default.controller.js";
import Login from "./login.controller.js";
import SignUp from "./signup.controller.js";

const pages = {
    default: Default,
    login: Login,
    signup: SignUp,
}

export { pages }