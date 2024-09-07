import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ProductsSearchableFields } from './product.constant';
import { TProducts } from './product.interface';
import { Products } from './product.model';

const createProductIntoDB = async (payload: TProducts) => {
  const available = payload.quantity;
  if (available === 0) {
    const isAvailable = false;
    const isStock = false;
    const payloadWithisAvailable = {
      ...payload,
      isAvailable,
      isStock
    };
    const result = await Products.create(payloadWithisAvailable);
    return result;
  }

  const result = await Products.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Products.find({ isDeleted: false }),
    query,
  )
    .search(ProductsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Products.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProducts>) => {
  const { ...productRemainingData } = payload;

  await Products.findByIdAndUpdate(
    id,
    productRemainingData,
  );

  const result = await Products.findById(id);
  return result
};

const deleteProductFromDB = async (id: string) => {
  // console.log('Delete product =', id);
  const product = await Products.findById(id, {isDeleted: true, isAvailable: false});

  if(!product){
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is not available')
  }

  if(product.isTopProduct === true || product.isTrendingProduct === true){
    throw new AppError(httpStatus.BAD_REQUEST, 'Top or Trending products could not be removed')
  }

  const result = await Products.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

// Bulk Delete product by updating isDeleted field
const bulkDeleteProductFromDB = async (ids: string[]) => {
  // console.log('bulk ids = ', ids);
  const result = await Products.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: true } },
  );
  return result;
};

const getAllTopProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Products.find({ isTopProduct: true }),
    query,
  )
    .search(ProductsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAllTrendingProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Products.find({ isTrendingProduct: true }),
    query,
  )
    .search(ProductsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

//Admin
const makeTopProduct = async (id: string) => {
  const product = await Products.findById(id, {isAvailable: true, isDeleted: false});

  if(!product){
    throw new AppError(httpStatus.BAD_REQUEST, 'This product is not available')
  }

  const result = await Products.findByIdAndUpdate(id, {isTopProduct: true})
  return result
}

const removeFromTopProduct = async (id: string) => {
  const product = await Products.findById(id, {isAvailable: true, isDeleted: false});

  if(!product){
    throw new AppError(httpStatus.BAD_REQUEST, 'This product is not available')
  }

  const result = await Products.findByIdAndUpdate(id, {isTopProduct: true})
  return result
}

const makeTrendingProduct = async (id: string) => {
  const product = await Products.findById(id, {isTopProduct: true, isAvailable: true, isDeleted: false});

  if(!product){
    throw new AppError(httpStatus.BAD_REQUEST, 'This product is not available')
  }

  const result = await Products.findByIdAndUpdate(id, {isTrendingProduct: false})
  return result
}

const removeFromTrendingProduct = async (id: string) => {
  const product = await Products.findById(id, {isTrendingProduct: true, isAvailable: true, isDeleted: false});

  if(!product){
    throw new AppError(httpStatus.BAD_REQUEST, 'This product is not available')
  }

  const result = await Products.findByIdAndUpdate(id, {isTrendingProduct: false})
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  bulkDeleteProductFromDB,
  makeTopProduct,
  makeTrendingProduct,
  removeFromTopProduct,
  removeFromTrendingProduct,
  getAllTopProductsFromDB,
  getAllTrendingProductsFromDB
};
