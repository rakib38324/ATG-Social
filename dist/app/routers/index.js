"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = require("../modeles/Auth/auth.router");
const userRegistration_router_1 = require("../modeles/UsersRegistration/userRegistration.router");
const post_router_1 = require("../modeles/Posts/post.router");
const comment_router_1 = require("../modeles/comments/comment.router");
const interaction_router_1 = require("../modeles/Interaction/interaction.router");
const router = (0, express_1.Router)();
const moduleRouters = [
    {
        path: '/register',
        route: userRegistration_router_1.userRouter,
    },
    {
        path: '/auth',
        route: auth_router_1.loginRouters,
    },
    {
        path: '/post',
        route: post_router_1.postRouters,
    },
    {
        path: '/comment',
        route: comment_router_1.commentRouters,
    },
    {
        path: '/interaction',
        route: interaction_router_1.interactionRouters,
    },
];
moduleRouters.forEach((route) => router.use(route.path, route.route));
exports.default = router;
