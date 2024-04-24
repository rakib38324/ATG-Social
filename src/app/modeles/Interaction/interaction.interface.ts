import { ObjectId } from 'mongoose';

export type TInteraction = {
  postId: ObjectId;
  interactionType: 'like' | 'unlike';
  interactionAuthId: ObjectId;
  interactionNumber: number;
};
