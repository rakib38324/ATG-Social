import { Router } from 'express';
import { loginRouters } from '../modeles/Auth/auth.router';
import { userRouter } from '../modeles/UsersRegistration/userRegistration.router';
import { postRouters } from '../modeles/Posts/post.router';

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
];

moduleRouters.forEach((route) => router.use(route.path, route.route));
export default router;
