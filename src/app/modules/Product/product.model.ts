import { Schema, model } from 'mongoose';
import { TProducts } from './product.interface';

const productSchema = new Schema<TProducts>({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sellsCount: {
    type: Number,
  },
  img: {
    type: String,
    required: true
  },
  imgLists: { 
    type: [String], 
  },
  isStock: {
    type: Boolean,
    default: true,
  },
  isTopProduct: {
    type: Boolean,
    default: true,
  },
  isTrendingProduct: {
    type: Boolean,
    default: true,
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
  timestamps: true
});

export const Products = model<TProducts>('Products', productSchema);
