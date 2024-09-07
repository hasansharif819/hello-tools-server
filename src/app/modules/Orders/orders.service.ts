import { TOrders } from './orders.interface';
import { Orders } from './orders.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import { Products } from '../Product/product.model';
import { Carts } from '../Carts/carts.model';


const createOrder = async (userData: JwtPayload, payload: TOrders) => {
  const userId = userData._id;

  const user = await User.findOne({ _id: userId });

  if(!user){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You can not make order. Please login');
  }

  const pId = payload.productId;
  const product = await Products.findOne({ _id: pId });

  if(!product){
    throw new AppError(httpStatus.BAD_REQUEST, 'This product is not available');
  }

  const cart = await Carts.findOne({userId: userId, productId: payload.productId});

  const cartId = cart?._id || null;

  const totalAmountofPrice = Number(product.price * payload.pQuantity);

  const payloadWithData = {
    name: user.name,
    email: user.email,
    address: payload.address,
    phone: payload.phone,
    productName: product.name,
    pImg: product.img,
    unitPrice: product.price,
    quantity: payload.quantity,
    pQuantity: payload.pQuantity,
    totalPrice: totalAmountofPrice,
    productId: payload.productId,
    userId: userId,
    cartId: cartId
  };

  const result = await Orders.create(payloadWithData);
  return result;
};

const updateOrdersIntoDB = async (id: string, userData: JwtPayload, payload: Partial<TOrders>) => {

  const { ...orderRemainingData } = payload;

  const uId = userData._id;
  const orders = await Orders.findById(id);

  if(!orders){
    throw new AppError(httpStatus.BAD_REQUEST, 'This order is not available')
  }

  if(uId !== orders.userId){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  await Orders.findByIdAndUpdate(
    id,
    orderRemainingData,
  );

  const result = await Orders.findById(id);
  return result;
};

const getAllOrdersFromDB = async (userData: JwtPayload) => {
  const uId = userData._id;
  const result = await Orders.find({userId: uId, isDeleted: false});

  return result
};

const getSingleOrdersFromDB = async (id: string, userData: JwtPayload) => {
  const uId = userData._id;
  const result = await Orders.findById(id);

  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, 'This order is not available')
  }

  if(uId !== result.userId){
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  return result;
};

const deleteOrderFromDB = async (id: string, userData: JwtPayload) => {

  const uId = userData._id;
  const order = await Carts.findById(id);

  if(!order){
    throw new AppError(httpStatus.BAD_REQUEST, 'This order is not available')
  }

  if(uId !== order.userId){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await Orders.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

// For Admin 

// Get All Orders for Admin 
const getAllOrdersForAdmin = async () => {
  const result = await Orders.find({isDeleted: false});
  return result
}

// Get All Deleted Orders for Admin
const getAllDeletedOrderForAdmin = async () => {
  const result = await Orders.find({isDeleted: true});
  return result
}

//Update Order Status
const updateOrderStatus = async (id: string,) => {

  const order = await Orders.findById(id, {status: 'inprogress', isDeleted: false, isAvailable: true});

  if(!order){
    throw new AppError(httpStatus.FORBIDDEN, 'No orders available')
  }

  if(order.paid === false && order.status === 'pending' || order.status === 'ready'){
    throw new AppError(httpStatus.BAD_REQUEST, 'Sorry!!! this status is not updated')
  }

  const result = await Orders.findByIdAndUpdate(id, {status: 'ready'})
  return result
}

//Update Order Delevary Status
const updateOrderDelevaryStatus = async (id: string,) => {

  const order = await Orders.findById(id, {status: 'ready', isDeleted: false, isAvailable: true});

  if(!order){
    throw new AppError(httpStatus.FORBIDDEN, 'No orders available')
  }

  const result = await Orders.findByIdAndUpdate(id, {deleveryStatus: 'complete'})
  return result
}

//Get All Pending Orders
const getAllPendingOrders = async () => {
  const result = await Orders.find({status: 'pending', isDeleted: false, isAvailable: true})
  return result;
} 


export const OrdersServices = {
  createOrder,
  updateOrdersIntoDB,
  getAllOrdersFromDB,
  getSingleOrdersFromDB,
  deleteOrderFromDB,
  //For Admin
  getAllOrdersForAdmin,
  getAllDeletedOrderForAdmin,
  updateOrderStatus,
  updateOrderDelevaryStatus,
  getAllPendingOrders
};
