/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { TPost } from './post.interface';
import { User } from '../UsersRegistration/userRegistration.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Post } from './post.model';
// import { sendImageToCloudinary } from '../../utiles/sendImagetoCloudinary';
// import { deleteImageFromCloudinary } from '../../utiles/deleteImageFromCloudinary';

const createPostIntoDB = async (payload: TPost, authorInfo: JwtPayload) => {
  const { email } = authorInfo;
  const isUserExists = await User.isUserExistsByEmail(email);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // const imageName = `ATG.Social_${payload.title}`;
  // const path = file?.path;
  // if (!path) {
  //   throw new AppError(httpStatus.BAD_REQUEST, 'Please add post image.');
  // }
  // const { secure_url, public_id }: any = await sendImageToCloudinary(
  //   imageName,
  //   path,
  // );

  const data = {
    ...payload,
    date: new Date(),
    author: isUserExists?._id,
    actions: 0,
    // image: secure_url,
    // image_public_id: public_id,
  };

  const post = await Post.create(data);

  return post;
};

const getAllPostFromDB = async () => {
  const result = await Post.find().populate('author');
  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById({ _id: id }).populate('author');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found.');
  }
  return result;
};

const deletePostFromDB = async (id: string, user: JwtPayload) => {
  const isExistPost = await Post.findById({ _id: id });

  if (!isExistPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not Found.');
  }
  const userId = user?._id;
  const postAuthor = `${isExistPost?.author}`;

  if (userId !== postAuthor) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized. You are not post owner',
    );
  }

  // const public_id = payload?.image_public_id;
  // if (!public_id) {
  //   return new AppError(
  //     httpStatus.BAD_REQUEST,
  //     'Please provide Image public Id',
  //   );
  // }

  const result = await Post.deleteOne({ _id: id });
  // if (public_id) {
  //   deleteImageFromCloudinary(public_id);
  // }
  return result;
};

const updatePostFromDB = async (
  _id: string,
  payload: Partial<TPost>,
  user: JwtPayload,
) => {
  const isExistPost = await Post.findById({ _id });

  if (!isExistPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not Found.');
  }

  const userId = user?._id;
  const postAuthor = `${isExistPost?.author}`;

  if (userId !== postAuthor) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized. You are not post owner',
    );
  }

  if (payload?.author) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized. You are not Super Admin',
    );
  }

  if (payload?.date) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Post date not updatable.');
  }

  const result = await Post.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostFromDB,
  deletePostFromDB,
  updatePostFromDB,
};
