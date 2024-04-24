"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    comment: { type: String, required: true },
    commentAuthor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Candidate' },
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post', required: true },
});
exports.Comment = (0, mongoose_1.model)('Comment', CommentSchema);
