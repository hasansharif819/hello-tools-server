import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrdersServices } from './orders.service';

const createOrders = catchAsync(async (req, res) => {
  const result = await OrdersServices.createOrder(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created succesfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrdersServices.updateOrdersIntoDB(id, req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'You have successfully updated your order',
    data: result,
  });
});

const getAllMyOrders = catchAsync(async (req, res) => {
  const result = await OrdersServices.getAllOrdersFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders list are retrieved successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrdersServices.getSingleOrdersFromDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved succesfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrdersServices.deleteOrderFromDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is succesfully deleted',
    data: result,
  });
});

//For Admin

const getAllOrdersForAdmin = catchAsync(async (req, res) => {
  const result = await OrdersServices.getAllOrdersForAdmin();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All available orders list are retrieved successfully',
    data: result,
  });
})

const getAllDeletedOrdersForAdmin = catchAsync(async (req, res) => {
  const result = await OrdersServices.getAllDeletedOrderForAdmin();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All deleted orders list are retrieved successfully',
    data: result,
  });
})

const getAllPendingOrders = catchAsync(async (req, res) => {
  const result = await OrdersServices.getAllPendingOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All pending orders list are retrieved successfully',
    data: result,
  });
})

const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrdersServices.updateOrderStatus(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status successfully updated to ready',
    data: result,
  });
});

const updateOrderDelevaryStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrdersServices.updateOrderDelevaryStatus(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order delevery status successfully updated to complete',
    data: result,
  });
});

export const OrdersControllers = {
  createOrders,
  updateOrder,
  getAllMyOrders,
  getSingleOrder,
  deleteOrder,
  //For Admin
  getAllOrdersForAdmin,
  getAllDeletedOrdersForAdmin,
  getAllPendingOrders,
  updateOrderStatus,
  updateOrderDelevaryStatus
};
