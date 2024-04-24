"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const createPostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string({ required_error: 'Image is required.' }),
        // image_public_id: z.string({ required_error: 'Image Public is required.' }),
        title: zod_1.z.string({ required_error: 'Title is required.' }).min(3),
        description: zod_1.z
            .string({ required_error: 'Description is required.' })
            .min(10)
            .max(260),
        date: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
    }),
});
const updatePostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string().optional(),
        // image_public_id: z.string({
        //   required_error: 'Image Public ID is required.',
        // }),
        title: zod_1.z.string({ required_error: 'Title is required.' }).optional(),
        description: zod_1.z
            .string({ required_error: 'Description is required.' })
            .min(10)
            .max(260)
            .optional(),
        date: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
    }),
});
exports.PostValidation = {
    createPostValidationSchema,
    updatePostValidationSchema,
};
