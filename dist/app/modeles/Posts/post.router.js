"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const post_validation_1 = require("./post.validation");
const post_controller_1 = require("./post.controller");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const sendImagetoCloudinary_1 = require("../../utiles/sendImagetoCloudinary");
const router = express_1.default.Router();
router.post('/create-post', (0, Auth_1.default)(), sendImagetoCloudinary_1.upload.single('file'), (req, response, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(post_validation_1.PostValidation.createPostValidationSchema), post_controller_1.postControllers.createPost);
router.get('/', (0, Auth_1.default)(), post_controller_1.postControllers.getAllPost);
router.get('/:id', (0, Auth_1.default)(), post_controller_1.postControllers.getSinglePost);
router.delete('/:id', (0, Auth_1.default)(), post_controller_1.postControllers.deletePost);
router.post('/:id', (0, Auth_1.default)(), sendImagetoCloudinary_1.upload.single('file'), (req, response, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(post_validation_1.PostValidation.updatePostValidationSchema), post_controller_1.postControllers.updatePost);
exports.postRouters = router;
