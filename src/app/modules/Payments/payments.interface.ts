import { Types } from "mongoose";

export type TPayments = {
  payment: string;
  transactionId: string;
  orderId: Types.ObjectId
  userId: Types.ObjectId;
  // productId: Types.ObjectId;
};
