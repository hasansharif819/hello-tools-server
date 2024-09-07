import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrdersControllers } from './orders.controller';
import { OrdersValidations } from './orders.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(OrdersValidations.createOrdersValidationSchema),
  OrdersControllers.createOrders,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(OrdersValidations.updateOrdersValidationSchema),
  OrdersControllers.updateOrder,
);

router.get(
  '/:id',
  OrdersControllers.getSingleOrder,
);

router.get(
  '/',
  OrdersControllers.getAllMyOrders,
);

router.delete(
  '/:id',
  OrdersControllers.deleteOrder,
);

// Admin 
router.get(
  '/admin/all-orders',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrdersControllers.getAllOrdersForAdmin,
);

router.get(
  '/admin/all-deleted-orders',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrdersControllers.getAllDeletedOrdersForAdmin,
);

router.get(
  '/admin/all-pending-orders',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrdersControllers.getAllPendingOrders,
);

router.patch(
  '/admin/update-order-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrdersControllers.updateOrderStatus,
);

router.patch(
  '/admin/update-order-delevery-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrdersControllers.updateOrderDelevaryStatus,
);

export const OrdersRoutes = router;
