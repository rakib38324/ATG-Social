"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Candidate' },
    date: { type: String },
    // image_public_id: { type: String, required: true },
});
exports.Post = (0, mongoose_1.model)('Post', PostSchema);
