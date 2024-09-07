import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.deleteProduct,
);

// Add the route for bulk product deletion
router.post(
  '/bulk-delete',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.bulkDeleteProducts,
);

router.get(
  '/',
  ProductControllers.getAllProducts,
);

router.get(
  '/:id',
  ProductControllers.getSingleProduct,
);

// Admin 

router.patch(
  'make-top-product/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.makeTopProduct,
);
router.patch(
  'make-trending-product/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.makeTrendingProduct,
);
router.patch(
  'remove-from-top-product/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.removeFromTopProduct,
);
router.patch(
  'remove-from-trending-product/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.removeFromTrendingProduct,
);

router.get(
  '/top-products',
  ProductControllers.getAllTopProducts,
);
router.get(
  '/trending-products',
  ProductControllers.getAllTrendingProducts,
);

export const ProductRoutes = router;
