"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidation = void 0;
const zod_1 = require("zod");
const createCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z
            .string({ required_error: 'Comment is required.' })
            .min(1)
            .max(260),
        commentAuthor: zod_1.z.string().optional(),
        postId: zod_1.z.string(),
    }),
});
exports.CommentValidation = {
    createCommentValidationSchema,
};
