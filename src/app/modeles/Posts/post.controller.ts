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

const getAllPost = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostFromDB();
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Post Finds Successfully',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.getSinglePostFromDB(id);
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Post Find Successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deletePostFromDB(id, req.body, req.user);
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Delete Successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.updatePostFromDB(
    id,
    req.body,
    req.file,
    req.user,
  );
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Update Successfully',
    data: result,
  });
});

export const postControllers = {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
  updatePost,
};
