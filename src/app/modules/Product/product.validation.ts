import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    brandName: z.string(),
    category: z.string(),
    price: z.number(),
    quantity: z.number(),
    sellsCount: z.number().default(0),
    description: z.string(),
    img: z.string(),
    imgLists: z.array(z.string()).optional(),
    isStock: z.boolean().default(true),
    isTopProduct: z.boolean().default(false),
    isTrendingProduct: z.boolean().default(false),
    isAvailable: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    brandName: z.string().optional(),
    category: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    description: z.string().optional(),
    img: z.string().optional(),
    imgLists: z.array(z.string()).optional(),
    isAvailable: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
