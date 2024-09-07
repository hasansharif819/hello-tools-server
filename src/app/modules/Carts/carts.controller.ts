import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartsServices } from './carts.service';

const createCarts = catchAsync(async (req, res) => {
  const result = await CartsServices.createCartsIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is succesfully added into cart',
    data: result,
  });
});

const updateCarts = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartsServices.updateCartsIntoDB(id, req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'You have successfully updated the cart',
    data: result,
  });
});

const getAllCarts = catchAsync(async (req, res) => {
  const result = await CartsServices.getAllCartsFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart list are retrieved successfully',
    data: result,
  });
});

const getSingleCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartsServices.getSingleCartsFromDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart is retrieved succesfully',
    data: result,
  });
});

const deleteCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartsServices.deleteCartFromDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is succesfully deleted',
    data: result,
  });
});

export const CartsControllers = {
  createCarts,
  updateCarts,
  getAllCarts,
  getSingleCart,
  deleteCart
};
