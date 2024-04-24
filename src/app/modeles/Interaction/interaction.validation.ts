import { z } from 'zod';

const createInteractionValidationSchema = z.object({
  body: z.object({
    interactionAuthId: z.string().optional(),
    postId: z.string(),
    interactionType: z.enum(['like', 'unlike']),
    interactionNumber: z.number().optional(),
  }),
});

export const interactionValidation = {
  createInteractionValidationSchema,
};
