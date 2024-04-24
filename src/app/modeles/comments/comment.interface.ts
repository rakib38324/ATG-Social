import { ObjectId } from 'mongoose';

export type TComment = {
  postId: ObjectId;
  commentAuthor: ObjectId;
  comment: string;
};
