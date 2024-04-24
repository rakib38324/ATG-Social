"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouters = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const comment_controller_1 = require("./comment.controller");
const router = express_1.default.Router();
router.post('/create-comment', (0, Auth_1.default)(), (0, validateRequest_1.default)(comment_validation_1.CommentValidation.createCommentValidationSchema), comment_controller_1.commentControllers.createComment);
router.get('/get-comments/:postId', (0, Auth_1.default)(), comment_controller_1.commentControllers.getAllCommentWithPostId);
exports.commentRouters = router;
