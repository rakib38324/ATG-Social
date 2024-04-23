import httpStatus from 'http-status';
import catchAsync from '../../utiles/catchAsync';
import commonRes from '../../utiles/commonResponse';
import { PostServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(
    req.file,
    req.body,
    req.user,
  );
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
});

export const postControllers = {
  createPost,
};
