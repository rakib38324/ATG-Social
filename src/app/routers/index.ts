import { Router } from 'express';
import { loginRouters } from '../modeles/Auth/auth.router';
import { userRouter } from '../modeles/UsersRegistration/userRegistration.router';
import { postRouters } from '../modeles/Posts/post.router';
import { commentRouters } from '../modeles/comments/comment.router';
import { interactionRouters } from '../modeles/Interaction/interaction.router';

const router = Router();

const moduleRouters = [
  {
    path: '/register',
    route: userRouter,
  },
  {
    path: '/auth',
    route: loginRouters,
  },
  {
    path: '/post',
    route: postRouters,
  },
  {
    path: '/comment',
    route: commentRouters,
  },
  {
    path: '/interaction',
    route: interactionRouters,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));
export default router;
