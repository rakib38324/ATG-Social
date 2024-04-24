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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const userRegistration_model_1 = require("../UsersRegistration/userRegistration.model");
const auth_utillis_1 = require("./auth.utillis");
const config_1 = __importDefault(require("../../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = require("../../utiles/sendEmail");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //===>check if the user is exists
    const isUserExists = yield userRegistration_model_1.User.isUserExistsByUserName(payload.username);
    if (!isUserExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found! Check your username.');
    }
    ///====> checking if the password is correct
    const isPasswordMatch = yield userRegistration_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatch) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Password is not match!!');
    }
    //-====> access granted: send accessToken, RefreshToken
    const jwtPayload = {
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        username: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.username,
        _id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
    };
    //===========> create token and sent to the client
    const accessToken = (0, auth_utillis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    //===========> create refresh token and sent to the client
    const refreshToken = (0, auth_utillis_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_access_expires_in);
    return { user: jwtPayload, token: accessToken, refreshToken: refreshToken };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //===>check if the user is exists
    const isUserExists = yield userRegistration_model_1.User.isUserExistsByEmail(userData.email);
    if (!isUserExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'This user not found!');
    }
    const currentPassword = payload === null || payload === void 0 ? void 0 : payload.currentPassword;
    const hashpassword = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password;
    ///====> checking if the given password and exists password is correct
    const isPasswordMatch = yield userRegistration_model_1.User.isPasswordMatched(currentPassword, hashpassword);
    if (!isPasswordMatch) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Password is not match!!');
    }
    // ===> hash new password
    const newHasedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_round));
    yield userRegistration_model_1.User.findOneAndUpdate({
        email: userData.email,
    }, {
        password: newHasedPassword,
        passwordChangedAt: new Date(),
    });
    return null;
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield userRegistration_model_1.User.isUserExistsByEmail(email);
    if (!isUserExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'This user not found!');
    }
    const jwtPayload = {
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        username: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.username,
        _id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
    };
    //===========> create token and sent to the client
    const resetToken = (0, auth_utillis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '10m');
    const resetUILink = `${config_1.default.reset_password_ui_link}?email=${isUserExists.email}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(isUserExists.email, resetUILink);
    return `Reset link sent your email: ${isUserExists.email}`;
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield userRegistration_model_1.User.isUserExistsByEmail(payload.email);
    if (!isUserExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'This user not found!');
    }
    //====> verify token
    const decoded = (0, auth_utillis_1.VerifyToken)(token, config_1.default.jwt_access_secret);
    // console.log(decoded)
    if (decoded.email !== payload.email) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, `You are forbidden!!`);
    }
    ///===> hash new password
    const newHasedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_round));
    yield userRegistration_model_1.User.findOneAndUpdate({
        email: decoded.email,
    }, {
        password: newHasedPassword,
        passwordChangedAt: new Date(),
    });
    return 'Your Password Changed Successfully';
});
exports.AuthServices = {
    loginUser,
    changePassword,
    forgetPassword,
    resetPassword,
};
