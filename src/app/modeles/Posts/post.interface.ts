import { ObjectId } from 'mongoose';

export type TPost = {
  image: string;
  title: string;
  description: string;
  date?: string;
  author?: ObjectId;
  image_public_id?: string;
};
