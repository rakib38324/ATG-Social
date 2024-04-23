import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { PostValidation } from './post.validation';
import { postControllers } from './post.controller';
import Auth from '../../middlewares/Auth';

const router = express.Router();

router.post(
  '/create-post',
  Auth(),
  ValidateRequest(PostValidation.createPostValidationSchema),
  postControllers.createPost,
);

export const postRouters = router;
