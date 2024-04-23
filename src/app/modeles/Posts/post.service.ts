import { JwtPayload } from 'jsonwebtoken';
import { TPost } from './post.interface';
import { User } from '../UsersRegistration/userRegistration.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost, authorInfo: JwtPayload) => {
  const { email } = authorInfo;
  const isUserExists = await User.isUserExistsByEmail(email);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const data = {
    ...payload,
    date: new Date(),
    author: isUserExists?._id,
  };

  const post = await Post.create(data);

  return post;
};

export const PostServices = {
  createPostIntoDB,
};
