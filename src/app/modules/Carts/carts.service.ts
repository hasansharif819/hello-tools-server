import { TCarts } from './carts.interface';
import { Carts } from './carts.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
// import { User } from '../User/user.model';
// import { Products } from '../Product/product.model';


const createCartsIntoDB = async (userData: JwtPayload, payload: TCarts) => {
  // const userEmail = payload.email;

  // const user = await User.findOne({ email: userEmail });

  // if(!user){
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized. Please login');
  // }

  // const pId = payload.productId;
  // const product = await Products.findOne({ _id: pId });

  // if(!product){
  //   throw new AppError(httpStatus.BAD_REQUEST, 'This product is not available');
  // }

  // const totalAmountofPrice = (product.price * payload.quantity);

  // const payloadWithData = {
  //   name: user.name,
  //   email: user.email,
  //   userId: userId,
  //   productName: product.name,
  //   unitPrice: product.price,
  //   pImg: product.img,
  //   quantity: payload.quantity,
  //   productId: payload.productId,
  //   totalPrice: totalAmountofPrice,
  // };

  const result = await Carts.create(payload);
  return result;
};

const updateCartsIntoDB = async (id: string, userData: JwtPayload, payload: Partial<TCarts>) => {

  const userEmail = payload.email;
  const cart = await Carts.findById(id);

  if(!cart){
    throw new AppError(httpStatus.BAD_REQUEST, 'This cart is not available for edit')
  }

  if(userEmail !== cart.email){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to edit this cart');
  }

  await Carts.findByIdAndUpdate(
    id,
    { quantity: payload.quantity },
  );

  const result = await Carts.findById(id);
  return result;
};

const getAllCartsFromDB = async (userData: JwtPayload) => {
  const uId = userData._id;
  const result = await Carts.find({userId: uId, isDeleted: false});

  return result
};

const getSingleCartsFromDB = async (id: string, userData: JwtPayload) => {
  const uId = userData._id;
  const result = await Carts.findById(id);

  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, 'This cart is not available')
  }

  if(uId !== result.userId){
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  return result;
};

const deleteCartFromDB = async (id: string, userData: JwtPayload) => {
  // console.log('Delete cart =', id);

  const uId = userData._id;
  const cart = await Carts.findById(id);

  if(!cart){
    throw new AppError(httpStatus.BAD_REQUEST, 'This cart is not available')
  }

  if(uId !== cart.userId){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to delete this cart');
  }

  const result = await Carts.findByIdAndDelete(id);
  return result;
};

export const CartsServices = {
  createCartsIntoDB,
  updateCartsIntoDB,
  getAllCartsFromDB,
  getSingleCartsFromDB,
  deleteCartFromDB
};
