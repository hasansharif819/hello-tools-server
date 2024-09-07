import { TStatus } from "./orders.interface";

export const OrdersSearchableFields = [
  'name',
  'email',
  'address',
  'phone',
  'productName',
  'price',
  'quantity',
  'paid',
  'deleveryStatus',
  'status'
];

export const Status: TStatus[] = ['pending', 'inprogress', 'ready'];

export const DeleveryStatus = ['incomplete', 'complete'];