import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CartsControllers } from './carts.controller';
import { CartsValidations } from './carts.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-cart',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(CartsValidations.createCartsValidationSchema),
  CartsControllers.createCarts,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(CartsValidations.updateCartsValidationSchema),
  CartsControllers.updateCarts,
);

router.get(
  '/:id',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  CartsControllers.getSingleCart,
);

router.get(
  '/',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  CartsControllers.getAllCarts,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  CartsControllers.deleteCart,
);

export const CartsRoutes = router;
