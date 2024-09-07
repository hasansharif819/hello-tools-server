import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentsServices } from './comments.service';

const createComments = catchAsync(async (req, res) => {
  const result = await CommentsServices.createCommentsIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments is created succesfully',
    data: result,
  });
});

const updateComments = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentsServices.updateCommentIntoDB(id, req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'You have successfully edited the comment',
    data: result,
  });
});

const getAllComments = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentsServices.getAllCommentsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments list are retrieved successfully',
    data: result,
  });
});

const getSingleComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentsServices.getSingleCommentsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is retrieved succesfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentsServices.deleteCommentFromDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is succesfully deleted',
    data: result,
  });
});

export const CommentsControllers = {
  createComments,
  updateComments,
  getAllComments,
  getSingleComment,
  deleteComment
};
