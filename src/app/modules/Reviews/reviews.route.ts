import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewsControllers } from './reviews.controller';
import { ReviewsValidations } from './reviews.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-reviews',
  auth(USER_ROLE.user),
  validateRequest(ReviewsValidations.createReviewsValidationSchema),
  ReviewsControllers.createReviews,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(ReviewsValidations.updateReviewValidationSchema),
  ReviewsControllers.updateReviews,
);

router.get(
  '/:id',
  ReviewsControllers.getSingleReview,
);

router.get(
  '/',
  ReviewsControllers.getAllReviews,
);

export const ReviewsRoutes = router;
