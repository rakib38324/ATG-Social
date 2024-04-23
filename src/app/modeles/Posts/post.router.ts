import express, { NextFunction, Request, Response } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { PostValidation } from './post.validation';
import { postControllers } from './post.controller';
import Auth from '../../middlewares/Auth';
import { upload } from '../../utiles/sendImagetoCloudinary';

const router = express.Router();

router.post(
  '/create-post',
  Auth(),
  upload.single('file'),
  (req: Request, response: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(PostValidation.createPostValidationSchema),
  postControllers.createPost,
);

router.get('/', postControllers.getAllPost);

router.get('/:id', postControllers.getSinglePost);

router.delete('/:id', postControllers.deletePost);

router.patch(
  '/:id',
  ValidateRequest(PostValidation.updatePostValidationSchema),
  postControllers.updatePost,
);

export const postRouters = router;
