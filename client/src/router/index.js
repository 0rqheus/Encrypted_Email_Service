import Vue from "vue";
import Router from "vue-router";
import { store } from "../store";

import Home from "@/components/Home";
import About from "@/components/About";

import Users from "@/components/Users";
import User from "@/components/User";
import Update from "@/components/Update";

import Mails from "@/components/Mails";
import Mail from "@/components/Mail";
import Compose from "@/components/Compose";

import Chats from "@/components/Chats";
import Chat from "@/components/Chat";

import Login from "@/components/Login";
import Signup from "@/components/Signup";

import Developer from "@/components/Developer";
import NotFound from "@/components/404";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/about",
            name: "About",
            component: About
        },

        {
            path: "/users",
            name: "Users",
            component: Users,
            beforeEnter: checkAdmin
        },
        {
            path: "/user/:id",
            name: "User",
            component: User,
            beforeEnter: (to, from, next) => {
                const currentUserId = store.state.user._id;
                const ownerUserId = to.params.id;

                if (currentUserId === ownerUserId)
                    next();
                else
                    checkAdmin(to, from, next);
            }
        },
        {
            path: "/update/:id",
            name: "Update",
            component: Update,
            beforeEnter: (to, from, next) => {

                const currentUserId = store.state.user._id;
                const ownerUserId = to.params.id;

                if (currentUserId === ownerUserId)
                    next();
                else
                    next(false);
            }
        },

        {
            path: "/mails",
            name: "Mails",
            component: Mails,
            beforeEnter: checkLogin
        },
        {
            path: "/mail/:id",
            name: "Mail",
            component: Mail,
            beforeEnter: checkLogin
        },
        {
            path: "/compose",
            name: "Compose",
            component: Compose,
            beforeEnter: checkLogin
        },

        {
            path: "/chats",
            name: "Chats",
            component: Chats,
            beforeEnter: checkLogin
        },
        {
            path: "/chats/:id",
            name: "Chat",
            component: Chat,
            beforeEnter: checkLogin
        },

        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/signup",
            name: "Signup",
            component: Signup
        },

        {
            path: "/developer/v1",
            name: "Developer",
            component: Developer
        },

        {
            path: "/403",
            name: "NotAdmin",
            component: { template: "<div><h1>Error 403</h1> <p>Access forbidden</p></div>" }
        },
        {
            path: "*",
            name: "NotFound",
            component: NotFound
        }
    ]
});

function checkLogin(to, from, next) {
    const currentUser = store.state.user;

    if (currentUser.login)
        next();
    else
        next({
            path: "/login",
            query: { redirect: to.fullPath }
        });
}

function checkAdmin(to, from, next) {
    const currentUser = store.state.user;

    if (currentUser.role)
        next();
    else
        next({
            name: "NotAdmin"
        });
}