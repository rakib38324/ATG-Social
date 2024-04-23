/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { TPost } from './post.interface';
import { User } from '../UsersRegistration/userRegistration.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Post } from './post.model';
import { sendImageToCloudinary } from '../../utiles/sendImagetoCloudinary';
import { deleteImageFromCloudinary } from '../../utiles/deleteImageFromCloudinary';

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
  const { secure_url, public_id }: any = await sendImageToCloudinary(
    imageName,
    path,
  );

  const data = {
    ...payload,
    date: new Date(),
    author: isUserExists?._id,
    image: secure_url,
    image_public_id: public_id,
  };

  const post = await Post.create(data);

  return post;
};

const getAllPostFromDB = async () => {
  const result = await Post.find().populate('author');
  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findOne({ _id: id }).populate('author');
  return result;
};

const deletePostFromDB = async (id: string, payload: TPost) => {
  const public_id = payload?.image_public_id;
  if (!public_id) {
    return new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide Image public Id',
    );
  }
  const result = await Post.deleteOne({ _id: id });
  if (public_id) {
    deleteImageFromCloudinary(public_id);
  }
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostFromDB,
  deletePostFromDB,
};
