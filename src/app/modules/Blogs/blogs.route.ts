import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { BlogsControllers } from './blogs.controller';
import { BlogsValidations } from './blogs.validation';

const router = express.Router();

router.post(
  '/create-blog',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(BlogsValidations.createBlogValidationSchema),
  BlogsControllers.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(BlogsValidations.updateBlogValidationSchema),
  BlogsControllers.updateBlog,
);

router.get(
  '/:id',
  BlogsControllers.getSingleBlog,
);

router.get(
  '/',
  BlogsControllers.getAllBlogs,
);

export const BlogsRoutes = router;
