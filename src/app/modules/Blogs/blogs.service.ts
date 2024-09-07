import QueryBuilder from '../../builder/QueryBuilder';
import { BlogsSearchableFields } from './blogs.constant';
import { TBlogs } from './blogs.interface';
import { Blogs } from './blogs.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createBlogIntoDB = async (payload: TBlogs) => {
  const result = await Blogs.create(payload);
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlogs>) => {
  const { ...blogsRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //step1: basic blog info update
    const updatedBasicBlogInfo = await Blogs.findByIdAndUpdate(
      id,
      blogsRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );


    if (!updatedBasicBlogInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update blog');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Blogs.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update blog');
  }
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(
    Blogs.find({ isDeleted: false }),
    query,
  )
    .search(BlogsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogsQuery.modelQuery;
  const meta = await blogsQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blogs.findById(id);
  return result;
};

export const BlogsServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
};
