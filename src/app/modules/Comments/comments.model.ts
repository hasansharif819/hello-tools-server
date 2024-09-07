import { Schema, model } from 'mongoose';
import { TComments } from './comments.interface';

const commentsSchema = new Schema<TComments>(
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
    comment: {
      type: String,
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blogs',
      required: true,
    },
    commenterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    img: {
      type: String,
      // required: true,
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

export const Comments = model<TComments>('Comments', commentsSchema);
