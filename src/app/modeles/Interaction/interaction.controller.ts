import httpStatus from 'http-status';
import catchAsync from '../../utiles/catchAsync';
import commonRes from '../../utiles/commonResponse';
import { InteractionServices } from './interaction.service';

const createInteraction = catchAsync(async (req, res) => {
  const result = await InteractionServices.createInteractionIntoDB(
    req.body,
    req.user,
  );
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result?.message,
    data: result,
  });
});

export const InteractionControllers = {
  createInteraction,
};
