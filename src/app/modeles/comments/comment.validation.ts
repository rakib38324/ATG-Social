import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    comment: z
      .string({ required_error: 'Comment is required.' })
      .min(1)
      .max(260),
    commentAuthor: z.string().optional(),
    postId: z.string(),
  }),
});

export const CommentValidation = {
  createCommentValidationSchema,
};
