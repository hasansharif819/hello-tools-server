import { Types } from "mongoose";

export type TStatus = 'inprogress' | 'pending' | 'ready';
export type TDeleveryStatus = 'incomplete' | 'complete';


export type TOrders = {
  name: string;
  email: string;
  address: string;
  phone: string;
  productName: string;
  pImg: string;
  unitPrice: number;
  quantity: number;
  pQuantity: number;
  totalPrice: number;
  productId: Types.ObjectId;
  cartId?: Types.ObjectId;
  userId: Types.ObjectId;
  status: TStatus;
  deleveryStatus: TDeleveryStatus;
  paid?: boolean;
  transaction?: string;
  isAvailable?: boolean;
  isDeleted?: boolean;
};
