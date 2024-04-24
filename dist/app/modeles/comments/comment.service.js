"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const post_model_1 = require("../Posts/post.model");
const comment_model_1 = require("./comment.model");
const createCommentIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isPostExists = yield post_model_1.Post.findById({ _id: payload.postId });
    if (!isPostExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not found!');
    }
    const data = Object.assign(Object.assign({}, payload), { commentAuthor: user === null || user === void 0 ? void 0 : user._id });
    const post = yield comment_model_1.Comment.create(data);
    return post;
});
const getCommentWithPostIdInFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const isPostExists = yield post_model_1.Post.findById({ _id });
    if (!isPostExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not found!');
    }
    const allComment = yield comment_model_1.Comment.find({ postId: _id });
    return allComment;
});
exports.CommentServices = {
    createCommentIntoDB,
    getCommentWithPostIdInFromDB,
};
