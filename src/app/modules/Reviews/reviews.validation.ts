import { z } from 'zod';

const createReviewsValidationSchema = z.object({
  body: z.object({
    review: z.string(),
    ratings: z.number(),
    productId: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    review: z.string().optional(),
    ratings: z.number().optional(),
  }),
});

export const ReviewsValidations = {
  createReviewsValidationSchema,
  updateReviewValidationSchema
};
