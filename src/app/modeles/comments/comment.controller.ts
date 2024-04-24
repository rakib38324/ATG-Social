import httpStatus from 'http-status';
import catchAsync from '../../utiles/catchAsync';
import commonRes from '../../utiles/commonResponse';
import { CommentServices } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentIntoDB(req.body, req.user);

  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment Create Successfully!',
    data: result,
  });
});

const getAllCommentWithPostId = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await CommentServices.getCommentWithPostIdInFromDB(postId);

  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment received Successfully!',
    data: result,
  });
});

export const commentControllers = {
  createComment,
  getAllCommentWithPostId,
};
