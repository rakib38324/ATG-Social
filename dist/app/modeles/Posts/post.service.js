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
exports.PostServices = void 0;
const userRegistration_model_1 = require("../UsersRegistration/userRegistration.model");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_1 = __importDefault(require("http-status"));
const post_model_1 = require("./post.model");
const sendImagetoCloudinary_1 = require("../../utiles/sendImagetoCloudinary");
const deleteImageFromCloudinary_1 = require("../../utiles/deleteImageFromCloudinary");
const createPostIntoDB = (file, payload, authorInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = authorInfo;
    const isUserExists = yield userRegistration_model_1.User.isUserExistsByEmail(email);
    if (!isUserExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const imageName = `ATG.Social_${payload.title}`;
    const path = file === null || file === void 0 ? void 0 : file.path;
    if (!path) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Please add post image.');
    }
    const { secure_url, public_id } = yield (0, sendImagetoCloudinary_1.sendImageToCloudinary)(imageName, path);
    const data = Object.assign(Object.assign({}, payload), { date: new Date(), author: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id, image: secure_url, image_public_id: public_id });
    const post = yield post_model_1.Post.create(data);
    return post;
});
const getAllPostFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find().populate('author');
    return result;
});
const getSinglePostFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findById({ _id: id }).populate('author');
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not found.');
    }
    return result;
});
const deletePostFromDB = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPost = yield post_model_1.Post.findById({ _id: id });
    if (!isExistPost) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not Found.');
    }
    const userId = user === null || user === void 0 ? void 0 : user._id;
    const postAuthor = `${isExistPost === null || isExistPost === void 0 ? void 0 : isExistPost.author}`;
    if (userId !== postAuthor) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized. You are not post owner');
    }
    const public_id = payload === null || payload === void 0 ? void 0 : payload.image_public_id;
    if (!public_id) {
        return new appError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide Image public Id');
    }
    const result = yield post_model_1.Post.deleteOne({ _id: id });
    if (public_id) {
        (0, deleteImageFromCloudinary_1.deleteImageFromCloudinary)(public_id);
    }
    return result;
});
const updatePostFromDB = (_id, payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPost = yield post_model_1.Post.findById({ _id });
    if (!isExistPost) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not Found.');
    }
    const userId = user === null || user === void 0 ? void 0 : user._id;
    const postAuthor = `${isExistPost === null || isExistPost === void 0 ? void 0 : isExistPost.author}`;
    if (userId !== postAuthor) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized. You are not post owner');
    }
    if (file) {
        const imageName = `ATG.Social_${_id}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        const { secure_url, public_id } = yield (0, sendImagetoCloudinary_1.sendImageToCloudinary)(imageName, path);
        const newData = Object.assign(Object.assign({}, payload), { image: secure_url, image_public_id: public_id });
        if (payload === null || payload === void 0 ? void 0 : payload.image_public_id) {
            (0, deleteImageFromCloudinary_1.deleteImageFromCloudinary)(payload === null || payload === void 0 ? void 0 : payload.image_public_id);
        }
        const result = yield post_model_1.Post.findOneAndUpdate({ _id }, newData, {
            new: true,
            runValidators: true,
        });
        return result;
    }
    const result = yield post_model_1.Post.findOneAndUpdate({ _id }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.PostServices = {
    createPostIntoDB,
    getAllPostFromDB,
    getSinglePostFromDB,
    deletePostFromDB,
    updatePostFromDB,
};
