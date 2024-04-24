import express from 'express';
import Auth from '../../middlewares/Auth';
import ValidateRequest from '../../middlewares/validateRequest';
import { CommentValidation } from './comment.validation';
import { commentControllers } from './comment.controller';

const router = express.Router();

router.post(
  '/create-comment',
  Auth(),
  ValidateRequest(CommentValidation.createCommentValidationSchema),
  commentControllers.createComment,
);

router.get(
  '/get-comments/:postId',
  Auth(),
  commentControllers.getAllCommentWithPostId,
);

export const commentRouters = router;
