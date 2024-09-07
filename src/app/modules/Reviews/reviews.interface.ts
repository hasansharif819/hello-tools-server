import { Types } from "mongoose";

export type TReviews = {
  name: string;
  email: string;
  review: string;
  ratings: number;
  productId: Types.ObjectId;
  reviewerId: Types.ObjectId;
  img: string;
  isDeleted?: boolean;
};
