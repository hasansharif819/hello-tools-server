import QueryBuilder from '../../builder/QueryBuilder';
import { ReviewsSearchableFields } from './reviews.constant';
import { TReviews } from './reviews.interface';
import { Reviews } from './reviews.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import { Products } from '../Product/product.model';


const createReviewsIntoDB = async (userData: JwtPayload, payload: TReviews) => {
  const userEmail = userData.email;
  const userRole = userData.role;


  if (userRole !== 'user') {
    throw new AppError(httpStatus.BAD_REQUEST, 'You can not create reviews');
  }

  const user = await User.findOne({ email: userEmail });

  if(!user){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to create reviews');
  }

  const productId = payload.productId;
  const product = await Products.findOne({ _id: productId });

  if(!product){
    throw new AppError(httpStatus.BAD_REQUEST, 'This product is not available for reviews');
  }

  const payloadWithUserData = {
    ...payload,
    name: user.name,
    email: user.email,
    img: user.img,
    reviewerId: user._id
  };

  const result = await Reviews.create(payloadWithUserData);
  return result;
};

const updateReviewsIntoDB = async (id: string, userData: JwtPayload, payload: Partial<TReviews>) => {

  const userEmail = userData.email;

  const user = await User.findOne({ email: userEmail });

  if(!user){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized for comment');
  }

  const review = await Reviews.findById(id);

  if(!review){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to update this reviews');
  }

  if(userEmail !== review.email){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to update this reviews');
  }

  const { ...reviewsRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //step1: basic blog info update
    const updatedBasicReviewsInfo = await Reviews.findByIdAndUpdate(
      id,
      reviewsRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );


    if (!updatedBasicReviewsInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update reviews');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Reviews.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update reviews');
  }
};

const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
  const reviewsQuery = new QueryBuilder(
    Reviews.find({ isDeleted: false }),
    query,
  )
    .search(ReviewsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await reviewsQuery.modelQuery;
  const meta = await reviewsQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleReviewsFromDB = async (id: string) => {
  const result = await Reviews.findById(id);
  return result;
};

export const ReviewsServices = {
  createReviewsIntoDB,
  updateReviewsIntoDB,
  getAllReviewsFromDB,
  getSingleReviewsFromDB,
};
