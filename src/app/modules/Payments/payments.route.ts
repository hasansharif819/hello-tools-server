import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentsControllers } from './payments.controller';
import { PaymentsValidations } from './payments.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-payment-intent',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(PaymentsValidations.createPaymentValidationSchema),
  PaymentsControllers.createPayment,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  PaymentsControllers.getSinglePayment,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  PaymentsControllers.getAllPayments,
);

router.get(
  '/admin/all-payments',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  PaymentsControllers.getAllPaymentsForAdmin,
);

export const PaymentsRoutes = router;
