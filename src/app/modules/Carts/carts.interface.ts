import { Types } from "mongoose";

export type TCarts = {
  name: string;
  email: string;
  productName: string;
  pImg: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  isDeleted?: boolean;
};
