import Default from "./default.controller.js";
import Login from "./login.controller.js";
import SignUp from "./signup.controller.js";
import Avatar from "./avatar.controller.js";
import Popups from "./popups.controller.js";
import Posts from "./posts.controller.js";
import AboutUs from "./aboutus.controller.js"
import ContactUs from "./contactus.controller.js"

const pages = {
    default: Default,
    login: Login,
    signup: SignUp,
    avatar: Avatar,
    popups: Popups,
    posts: Posts,
    aboutUs: AboutUs,
    contactUs: ContactUs
}

export { pages }