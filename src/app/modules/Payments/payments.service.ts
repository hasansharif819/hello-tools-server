import { TPayments } from './payments.interface';
import { Payments } from './payments.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import { Orders } from '../Orders/orders.model';
import mongoose from 'mongoose';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// const createPayment = async (amount: number, currency: string) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });
//     return paymentIntent;
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     throw error;
//   }
// };


const createPayment = async (userData: JwtPayload, payload: TPayments) => {
  const userId = userData._id;

  const user = await User.findOne({ _id: userId });

  if(!user){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized. Please login');
  }

  const oId = payload.orderId;
  const order = await Orders.findById({_id: oId, paid: false, status: 'pending', deleveryStatus: 'incomplete'});

  if(!order){
    throw new AppError(httpStatus.FORBIDDEN, 'Payment is not successfull');
  }

  const price = order.totalPrice;
  const amount = price * 120;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card']
    })

    if (!paymentIntent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to make payment');
    }

    const result = { clientSecret: paymentIntent.client_secret }

    const paymentData = await Payments.findById(paymentIntent.id)

    if(!paymentData){
      throw new AppError(httpStatus.BAD_REQUEST, 'Payment is not successfull')
    }

    await Orders.findByIdAndUpdate({_id: oId}, {paid: true, status: 'inprogress', transaction: paymentData.transactionId})

    await session.commitTransaction();
    await session.endSession();

    return result;
  }
  catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment failed!!!');
  }
};


const getAllPaymentsFromDB = async (userData: JwtPayload) => {
  const uId = userData._id;
  const result = await Payments.find({userId: uId});
  return result
};

const getSinglePaymentsFromDB = async (id: string,) => {
  const result = await Payments.findById(id);
  return result;
};

// Admin 
const getAllPaymentsForAdminFromDB = async () => {
  const result = await Payments.find();
  return result
};

export const PaymentsServices = {
  createPayment,
  getAllPaymentsFromDB,
  getSinglePaymentsFromDB,
  getAllPaymentsForAdminFromDB
};
