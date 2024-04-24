import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    image_public_id: z.string().optional(),
    title: z.string({ required_error: 'Title is required.' }).min(2),
    description: z
      .string({ required_error: 'Description is required.' })
      .min(10)
      .max(260),
    date: z.string().optional(),
    author: z.string().optional(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    image_public_id: z.string({
      required_error: 'Image Public ID is required.',
    }),
    title: z.string({ required_error: 'Title is required.' }).optional(),
    description: z
      .string({ required_error: 'Description is required.' })
      .min(10)
      .max(260)
      .optional(),
    date: z.string().optional(),
    author: z.string().optional(),
  }),
});

export const PostValidation = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
