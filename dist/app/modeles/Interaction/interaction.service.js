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
exports.InteractionServices = void 0;
const userRegistration_model_1 = require("../UsersRegistration/userRegistration.model");
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const interaction_model_1 = require("./interaction.model");
const post_model_1 = require("../Posts/post.model");
const createInteractionIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isUserExists = yield userRegistration_model_1.User.findById({ _id: user._id });
    if (!isUserExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const isPostExists = yield post_model_1.Post.findById({ _id: payload === null || payload === void 0 ? void 0 : payload.postId });
    if (!isPostExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not found!');
    }
    const isInteractionAlive = yield interaction_model_1.Interaction.findOne({
        postId: payload === null || payload === void 0 ? void 0 : payload.postId,
    });
    if (!isInteractionAlive) {
        const data = Object.assign(Object.assign({}, payload), { interactionAuthId: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id, interactionNumber: 1 });
        const result = yield interaction_model_1.Interaction.create(data);
        const actionData = {
            actions: (isPostExists === null || isPostExists === void 0 ? void 0 : isPostExists.actions) + 1,
            InteractedPeopleId: [isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id],
        };
        yield post_model_1.Post.findByIdAndUpdate({ _id: payload === null || payload === void 0 ? void 0 : payload.postId }, actionData, {
            new: true,
            runValidators: true,
        });
        return {
            message: 'Liked this post.',
            result,
        };
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.interactionType) === 'like' && isUserExists && isPostExists) {
        const data = {
            interactionNumber: (isInteractionAlive === null || isInteractionAlive === void 0 ? void 0 : isInteractionAlive.interactionNumber) + 1,
        };
        const result = yield interaction_model_1.Interaction.findOneAndUpdate({ postId: payload === null || payload === void 0 ? void 0 : payload.postId }, data, {
            new: true,
            runValidators: true,
        });
        const actionData = {
            actions: (isPostExists === null || isPostExists === void 0 ? void 0 : isPostExists.actions) + 1,
            InteractedPeopleId: [
                ...isPostExists === null || isPostExists === void 0 ? void 0 : isPostExists.InteractedPeopleId,
                `${isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id}`,
            ],
            // isPostExists?.InteractedPeopleId?.push(`${user._id}`)
        };
        yield post_model_1.Post.findByIdAndUpdate({ _id: payload === null || payload === void 0 ? void 0 : payload.postId }, actionData, {
            new: true,
            runValidators: true,
        });
        return {
            message: 'Liked this post.',
            result,
        };
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.interactionType) === 'unlike') {
        const data = {
            interactionNumber: (isInteractionAlive === null || isInteractionAlive === void 0 ? void 0 : isInteractionAlive.interactionNumber) - 1,
        };
        const result = yield interaction_model_1.Interaction.findOneAndUpdate({ postId: payload === null || payload === void 0 ? void 0 : payload.postId }, data, {
            new: true,
            runValidators: true,
        });
        const filteredInteractedPeopleId = (_a = isPostExists === null || isPostExists === void 0 ? void 0 : isPostExists.InteractedPeopleId) === null || _a === void 0 ? void 0 : _a.filter((id) => id !== `${user._id}`);
        const actionData = {
            actions: (isPostExists === null || isPostExists === void 0 ? void 0 : isPostExists.actions) - 1,
            InteractedPeopleId: filteredInteractedPeopleId,
        };
        yield post_model_1.Post.findByIdAndUpdate({ _id: payload === null || payload === void 0 ? void 0 : payload.postId }, actionData, {
            new: true,
            runValidators: true,
        });
        return {
            message: 'Unliked this post.',
            result,
        };
    }
});
exports.InteractionServices = {
    createInteractionIntoDB,
};
