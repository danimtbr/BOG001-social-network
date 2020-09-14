import Default from "./default.controller.js";
import Login from "./login.controller.js";
import SignUp from "./signup.controller.js";
import Popups from "./popups.controller.js";
import Posts from "./posts.controller.js";
import AboutUs from "./aboutus.controller.js"
import ContactUs from "./contactus.controller.js"
import PopUpDelete from "./alertdelete.controller.js"
import TextAreaPost from "./postTextarea.controller.js"
import ProfileUser from "./profileUser.controller.js"

const pages = {
    default: Default,
    login: Login,
    signup: SignUp,
    popups: Popups,
    posts: Posts,
    aboutUs: AboutUs,
    contactUs: ContactUs,
    popupdelete: PopUpDelete,
    textAreaPost: TextAreaPost,
    profileUser: ProfileUser
}

export { pages }