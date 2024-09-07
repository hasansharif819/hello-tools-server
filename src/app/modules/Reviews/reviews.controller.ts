import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewsServices } from './reviews.service';

const createReviews = catchAsync(async (req, res) => {
  const result = await ReviewsServices.createReviewsIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is created succesfully',
    data: result,
  });
});

const updateReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewsServices.updateReviewsIntoDB(id, req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'You have successfully updated the review',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewsServices.getAllReviewsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews list are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewsServices.getSingleReviewsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is retrieved succesfully',
    data: result,
  });
});

export const ReviewsControllers = {
  createReviews,
  updateReviews,
  getAllReviews,
  getSingleReview,
};
