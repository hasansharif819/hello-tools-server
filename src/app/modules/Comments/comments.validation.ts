import { z } from 'zod';

const createCommentsValidationSchema = z.object({
  body: z.object({
    comment: z.string(),
    blogId: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});

const updateCommentsValidationSchema = z.object({
  body: z.object({
    comment: z.string(),
  }),
});

export const CommentsValidations = {
  createCommentsValidationSchema,
  updateCommentsValidationSchema
};
