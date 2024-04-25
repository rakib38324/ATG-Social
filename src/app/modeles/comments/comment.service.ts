import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Post } from '../Posts/post.model';
import { TComment } from './comment.interface';
import { JwtPayload } from 'jsonwebtoken';
import { Comment } from './comment.model';

const createCommentIntoDB = async (payload: TComment, user: JwtPayload) => {
  const isPostExists = await Post.findById({ _id: payload.postId });
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!');
  }

  const data = {
    ...payload,
    commentAuthor: user?._id,
  };

  const post = await Comment.create(data);

  return post;
};

const getCommentWithPostIdInFromDB = async (_id: string) => {
  const isPostExists = await Post.findById({ _id });
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!');
  }
  const allComment = await Comment.find({ postId: _id }).populate(
    'commentAuthor',
  );

  return allComment;
};

export const CommentServices = {
  createCommentIntoDB,
  getCommentWithPostIdInFromDB,
};
