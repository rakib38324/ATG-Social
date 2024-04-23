import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    title: z.string({ required_error: 'Title is required.' }).min(2),
    description: z
      .string({ required_error: 'Description is required.' })
      .min(10)
      .max(260),
    date: z.string().optional(),
    author: z.string().optional(),
  }),
});

export const PostValidation = {
  createPostValidationSchema,
};
