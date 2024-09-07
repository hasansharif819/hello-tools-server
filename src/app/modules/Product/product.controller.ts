import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created succesfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllTopProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllTopProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top Products are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllTrendingProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllTrendingProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trending Products are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved succesfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated succesfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);
  // console.log('Delete product result =', result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted succesfully',
    data: result,
  });
});

//Bulk delete products
const bulkDeleteProducts = catchAsync(async (req, res) => {
  const { ids } = req.body;
  // console.log('controller', ids);
  const result = await ProductServices.bulkDeleteProductFromDB(ids);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products that marked are deleted successfully',
    data: result,
  });
});

// Admin 
const makeTopProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.makeTopProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'This Product is succesfully updated to top product',
    data: result,
  });
});
const removeFromTopProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.removeFromTopProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'This Product is succesfully removed from top product',
    data: result,
  });
});
const makeTrendingProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.makeTrendingProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'This Product is succesfully updated to trending product',
    data: result,
  });
});
const removeFromTrendingProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.removeFromTrendingProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'This Product is succesfully removed from trending product',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  makeTopProduct,
  makeTrendingProduct,
  removeFromTopProduct,
  removeFromTrendingProduct,
  getAllTopProducts,
  getAllTrendingProducts
};
