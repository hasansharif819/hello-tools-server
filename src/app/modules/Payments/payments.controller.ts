import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentsServices } from './payments.service';

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentsServices.createPayment(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment is succesfull',
    data: result,
  });
});

const getAllPayments = catchAsync(async (req, res) => {
  const result = await PaymentsServices.getAllPaymentsFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your payment list are retrieved successfully',
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PaymentsServices.getSinglePaymentsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment is retrieved succesfully',
    data: result,
  });
});

// Admin 
const getAllPaymentsForAdmin = catchAsync(async (req, res) => {
  const result = await PaymentsServices.getAllPaymentsForAdminFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment list are retrieved successfully',
    data: result,
  });
});

export const PaymentsControllers = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  getAllPaymentsForAdmin
};
