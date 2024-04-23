/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { TPost } from './post.interface';
import { User } from '../UsersRegistration/userRegistration.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Post } from './post.model';
import { sendImageToCloudinary } from '../../utiles/sendImagetoCloudinary';

const createPostIntoDB = async (
  file: any,
  payload: TPost,
  authorInfo: JwtPayload,
) => {
  const { email } = authorInfo;
  const isUserExists = await User.isUserExistsByEmail(email);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const imageName = `ATG.Social${payload.title}`;
  const path = file?.path;
  const { secure_url }: any = await sendImageToCloudinary(imageName, path);

  const data = {
    ...payload,
    date: new Date(),
    author: isUserExists?._id,
    image: secure_url,
  };

  const post = await Post.create(data);

  return post;
};

export const PostServices = {
  createPostIntoDB,
};
