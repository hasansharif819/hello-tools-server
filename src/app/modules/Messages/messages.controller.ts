import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessagesServices } from './messages.service';

const createMessage = catchAsync(async (req, res) => {
  const result = await MessagesServices.createMessage(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your message is sending succesfully',
    data: result,
  });
});

const getAllMessages = catchAsync(async (req, res) => {
  const result = await MessagesServices.getAllMessagesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Messages list are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleMessage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MessagesServices.getSingleMessageFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message is retrieved succesfully',
    data: result,
  });
});

export const MessagesControllers = {
  createMessage,
  getAllMessages,
  getSingleMessage,
};
