import { z } from 'zod';

const createCartsValidationSchema = z.object({
  body: z.object({
    productId: z.string(),
    quantity: z.number(),
    isDeleted: z.boolean().default(false),
  }),
});

const updateCartsValidationSchema = z.object({
  body: z.object({
    quantity: z.number(),
  }),
});

export const CartsValidations = {
  createCartsValidationSchema,
  updateCartsValidationSchema
};
