import { Schema, model } from 'mongoose';
import { TPayments } from './payments.interface';

const paymentSchema = new Schema<TPayments>(
  {
    payment: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Orders',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // productId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Products',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

export const Payments = model<TPayments>('Payments', paymentSchema);
