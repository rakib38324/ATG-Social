import { Schema, model } from 'mongoose';
import { TPost } from './post.interface';

const PostSchema = new Schema<TPost>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Candidate' },
  date: { type: String },
  // image_public_id: { type: String, required: true },
});

export const Post = model<TPost>('Post', PostSchema);
