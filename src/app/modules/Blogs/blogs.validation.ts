import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    des: z.string(),
    docs: z.string(),
    img: z.string(),
    isAvailable: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    des: z.string().optional(),
    docs: z.string().optional(),
    img: z.string().optional(),
    isAvailable: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const BlogsValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema
};
