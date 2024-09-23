import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CommentsControllers } from './comments.controller';
import { CommentsValidations } from './comments.validation';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-comment',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(CommentsValidations.createCommentsValidationSchema),
  CommentsControllers.createComments,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(CommentsValidations.updateCommentsValidationSchema),
  CommentsControllers.updateComments,
);

router.get(
  '/:id',
  CommentsControllers.getSingleComment,
);

router.get(
  '/blog/:id',
  CommentsControllers.getAllComments,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  CommentsControllers.deleteComment,
);

export const CommentsRoutes = router;
