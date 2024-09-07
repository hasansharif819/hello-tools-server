import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { UserRoutes } from '../modules/User/user.route';
import { BlogsRoutes } from '../modules/Blogs/blogs.route';
import { ReviewsRoutes } from '../modules/Reviews/reviews.route';
import { MessagesRoutes } from '../modules/Messages/messages.route';
import { CommentsRoutes } from '../modules/Comments/comments.route';
import { CartsRoutes } from '../modules/Carts/carts.route';
import { OrdersRoutes } from '../modules/Orders/orders.route';
import { PaymentsRoutes } from '../modules/Payments/payments.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/blogs',
    route: BlogsRoutes,
  },
  {
    path: '/reviews',
    route: ReviewsRoutes,
  },
  {
    path: '/messages',
    route: MessagesRoutes,
  },
  {
    path: '/comments',
    route: CommentsRoutes,
  },
  {
    path: '/carts',
    route: CartsRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
  {
    path: '/payments',
    route: PaymentsRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
