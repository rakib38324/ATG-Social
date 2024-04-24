"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config/config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const deleteImageFromCloudinary = (publicId) => {
    // Delete the image
    cloudinary_1.v2.uploader.destroy(publicId, function (error, result) {
        if (error) {
            console.error('Error deleting image:', error);
        }
        else {
            console.log('Image deleted successfully:', result);
        }
    });
};
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;
