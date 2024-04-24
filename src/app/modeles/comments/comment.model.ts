import { Schema, model } from 'mongoose';
import { TComment } from './comment.interface';

const CommentSchema = new Schema<TComment>({
  comment: { type: String, required: true },
  commentAuthor: { type: Schema.Types.ObjectId, ref: 'Candidate' },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

export const Comment = model<TComment>('Comment', CommentSchema);
