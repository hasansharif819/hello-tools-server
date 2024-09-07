import { TComments } from './comments.interface';
import { Comments } from './comments.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import { Blogs } from '../Blogs/blogs.model';


const createCommentsIntoDB = async (userData: JwtPayload, payload: TComments) => {
  const userEmail = userData.email;

  const user = await User.findOne({ email: userEmail });

  if(!user){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized for comment');
  }

  const blogId = payload.blogId;

  const blog = await Blogs.findOne({ _id: blogId });

  if(!blog){
    throw new AppError(httpStatus.BAD_REQUEST, 'This blog is not available for comments');
  }

  const payloadWithUserData = {
    ...payload,
    name: user.name,
    email: user.email,
    img: user.img,
    commenterId: user._id,
  };

  const result = await Comments.create(payloadWithUserData);
  return result;
};

const updateCommentIntoDB = async (id: string, userData: JwtPayload, payload: Partial<TComments>) => {

  const userEmail = userData.email;
  const user = await User.findOne({ email: userEmail });

  if(!user){
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is not available')
  }
  const userId = user._id;

  const comment = await Comments.findById(id);

  if(!comment){
    throw new AppError(httpStatus.BAD_REQUEST, 'This comment is not available for edit')
  }

  if(userId !== comment.commenterId){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to edit this comment');
  }

  const { ...commentsRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //step1: basic blog info update
    const updatedBasicCommentsInfo = await Comments.findByIdAndUpdate(
      id,
      commentsRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );


    if (!updatedBasicCommentsInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to edit comments');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Comments.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to edit comments');
  }
};

const getAllCommentsFromDB = async (id: string) => {
  const result = await Comments.find({blogId: id, isDeleted: false })
  return result
};

const getSingleCommentsFromDB = async (id: string) => {
  const result = await Comments.findById(id);
  return result;
};

const deleteCommentFromDB = async (id: string, userData: JwtPayload) => {
  // console.log('Delete comment =', id);

  const userEmail = userData.email;

  const user = await User.findOne({ email: userEmail });

  if(!user){
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is not available')
  }

  const userId = user._id;

  const comment = await Comments.findById(id);

  if(!comment){
    throw new AppError(httpStatus.BAD_REQUEST, 'This comment is not available')
  }

  if(userId !== comment.commenterId){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to delete this comment');
  }

  const result = await Comments.findByIdAndUpdate(
    id,
    { isDeleted: true }
  );
  return result;
};

export const CommentsServices = {
  createCommentsIntoDB,
  updateCommentIntoDB,
  getAllCommentsFromDB,
  getSingleCommentsFromDB,
  deleteCommentFromDB
};
