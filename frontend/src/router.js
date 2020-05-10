import Vue from "vue"
import Router from "vue-router"
import Main_Page from "./components/Pages/Main_Page";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Main_Page
        },
        {
            path: "/about",
            name: "about",
            component: () =>
                import("./components/Pages/About")
        },
        {
            path: "/contact",
            name: "contact",
            component: () =>
                import("./components/Pages/Contact")
        }
    ]
})