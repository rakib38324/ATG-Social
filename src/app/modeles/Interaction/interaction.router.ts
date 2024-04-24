import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import Auth from '../../middlewares/Auth';
import { interactionValidation } from './interaction.validation';
import { InteractionControllers } from './interaction.controller';

const router = express.Router();

router.post(
  '/like-unlike',
  Auth(),
  ValidateRequest(interactionValidation.createInteractionValidationSchema),
  InteractionControllers.createInteraction,
);

export const interactionRouters = router;
