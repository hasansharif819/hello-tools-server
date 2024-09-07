import { Types } from "mongoose";

export type TComments = {
  name: string;
  email: string;
  img: string;
  comment: string;
  blogId: Types.ObjectId;
  commenterId: Types.ObjectId;
  isDeleted?: boolean;
};
