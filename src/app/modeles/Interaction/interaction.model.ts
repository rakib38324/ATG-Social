import { Schema, model } from 'mongoose';
import { TInteraction } from './interaction.interface';

const InteractionSchema = new Schema<TInteraction>({
  interactionAuthId: { type: Schema.Types.ObjectId, ref: 'Candidate' },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  interactionNumber: { type: Number },
});

export const Interaction = model<TInteraction>(
  'Interaction',
  InteractionSchema,
);
