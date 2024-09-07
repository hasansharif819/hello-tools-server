import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MessagesControllers } from './messages.controller';
import { MessagesValidations } from './messages.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-message',
  validateRequest(MessagesValidations.createMessageValidationSchema),
  MessagesControllers.createMessage,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  MessagesControllers.getSingleMessage,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  MessagesControllers.getAllMessages,
);

export const MessagesRoutes = router;
