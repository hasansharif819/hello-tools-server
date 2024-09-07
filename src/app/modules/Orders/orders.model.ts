import { Schema, model } from 'mongoose';
import { TOrders } from './orders.interface';
import { DeleveryStatus, Status } from './orders.constant';

const ordersSchema = new Schema<TOrders>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    pImg: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    pQuantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Products',
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Carts',
    },
    status: {
      type: String,
      enum: {
        values: Status,
        message: '{VALUE} is not a valid status',
      },
      required: true,
    },
    deleveryStatus: {
      type: String,
      enum: {
        values: DeleveryStatus,
        message: '{VALUE} is not a valid gender',
      },
      required: true,
    },
    transaction: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Orders = model<TOrders>('Orders', ordersSchema);
