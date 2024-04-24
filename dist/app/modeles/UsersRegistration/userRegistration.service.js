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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const userRegistration_model_1 = require("./userRegistration.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username } = payload;
    const userExists = yield userRegistration_model_1.User.findOne({ email });
    const userUsernameExists = yield userRegistration_model_1.User.findOne({ username });
    if (userExists) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'User already exists! Duplicate email.');
    }
    if (userUsernameExists) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'User already exists! Duplicate username.');
    }
    const data = Object.assign(Object.assign({}, payload), { passwordChangedAt: new Date() });
    const user = yield userRegistration_model_1.User.create(data);
    if (user) {
        const result = yield userRegistration_model_1.User.aggregate([
            {
                $match: { email: user === null || user === void 0 ? void 0 : user.email },
            },
            {
                $project: {
                    password: 0,
                    passwordChangedAt: 0,
                    __v: 0,
                },
            },
        ]);
        return result[0];
    }
});
exports.UserServices = {
    createUserIntoDB,
};
