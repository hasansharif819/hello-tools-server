import { Schema, model } from 'mongoose';
import { TBlogs } from './blogs.interface';

const blogsSchema = new Schema<TBlogs>(
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
    des: {
      type: String,
      required: true,
    },
    docs: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
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

export const Blogs = model<TBlogs>('Blogs', blogsSchema);
