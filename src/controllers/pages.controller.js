import Info from "./info.controller.js"
import Account from "./account.controller.js"
import NotFound from "./404.controller.js"
import CreateAccount from "./createAccount.controller.js"
import Avatar from "./avatar.controller.js"
import Home from "./home.controller.js"

const pages = {
    info: Info,
    account: Account,
    createAccount: CreateAccount,
    avatar: Avatar,
    home: Home,
    notFound: NotFound
}

export { pages }