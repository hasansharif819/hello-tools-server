import { z } from 'zod';
import { DeleveryStatus, Status } from './orders.constant';

const createOrdersValidationSchema = z.object({
  body: z.object({
    address: z.string(),
    phone: z.string(),
    productId: z.string(),
    pQuantity: z.number(),
    status: z.enum([...Status] as [string, ...string[]]).default('pending'),
    deleveryStatus: z.enum([...DeleveryStatus] as [string, ...string[]]).default('incomplete'),
    transaction: z.string().default(''),
    paid: z.boolean().default(false),
    isAvailable: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
  }),
});

const updateOrdersValidationSchema = z.object({
  body: z.object({
    address: z.string().optional(),
    phone: z.string().optional(),
    pQuantity: z.number().optional(),
  }),
});

export const OrdersValidations = {
  createOrdersValidationSchema,
  updateOrdersValidationSchema
};
