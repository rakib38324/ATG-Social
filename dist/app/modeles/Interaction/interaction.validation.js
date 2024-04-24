"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionValidation = void 0;
const zod_1 = require("zod");
const createInteractionValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        interactionAuthId: zod_1.z.string().optional(),
        postId: zod_1.z.string(),
        interactionType: zod_1.z.enum(['like', 'unlike']),
        interactionNumber: zod_1.z.number().optional(),
    }),
});
exports.interactionValidation = {
    createInteractionValidationSchema,
};
