import { z } from 'zod';

const createPaymentValidationSchema = z.object({
  body: z.object({
    orderId: z.string(),
  }),
});

export const PaymentsValidations = {
  createPaymentValidationSchema,
};
